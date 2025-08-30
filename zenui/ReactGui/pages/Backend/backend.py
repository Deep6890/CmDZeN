# backend.py - Updated version with improved website blocker
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time
import os
import platform
import threading
import asyncio
from typing import List
import re

app = FastAPI()

# Allow React to call API from any localhost port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Website blocker configuration
redirect_ip = "127.0.0.1"
if platform.system() == "Windows":
    hosts_path = r"C:\Windows\System32\drivers\etc\hosts"
else:
    hosts_path = "/etc/hosts"
BLOCK_TAG = "# blocked_by_python_script"

# Store active blocks
active_blocks = {}

# Common domain variations to block for popular sites
domain_variations = {
    "facebook": ["facebook.com", "www.facebook.com", "m.facebook.com", "fb.com", "www.fb.com"],
    "youtube": ["youtube.com", "www.youtube.com", "m.youtube.com"],
    "twitter": ["twitter.com", "www.twitter.com"],
    "instagram": ["instagram.com", "www.instagram.com"],
    "tiktok": ["tiktok.com", "www.tiktok.com"],
    "netflix": ["netflix.com", "www.netflix.com"],
    "chatgpt": ["chatgpt.com", "www.chatgpt.com"],
    "reddit": ["reddit.com", "www.reddit.com"],
    "whatsapp": ["whatsapp.com", "www.whatsapp.com"],
    "discord": ["discord.com", "www.discord.com"],
}

# Pydantic models
class BlockRequest(BaseModel):
    websites: List[str]
    duration: int  # in minutes

class UnblockRequest(BaseModel):
    websites: List[str]

# Expanded questions list
questions = [
    {
        "id": 1,
        "question": "What is the time complexity of binary search?",
        "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        "correct": 1
    },
    {
        "id": 2,
        "question": "Which data structure uses FIFO principle?",
        "options": ["Stack", "Queue", "Tree", "Graph"],
        "correct": 1
    },
    {
        "id": 3,
        "question": "What does HTML stand for?",
        "options": [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        "correct": 0
    },
]

# Helper function to get all variations of a domain
def get_domain_variations(domain):
    # Remove http/https and www if present
    clean_domain = re.sub(r'^(https?://)?(www\.)?', '', domain.lower())
    clean_domain = clean_domain.split('/')[0]  # Remove paths
    
    # Check if we have predefined variations
    for key, variations in domain_variations.items():
        if key in clean_domain:
            return variations
    
    # If no predefined variations, create basic ones
    return [clean_domain, f"www.{clean_domain}"]

# Website blocking functions
def block_websites(websites: List[str]):
    try:
        all_domains_to_block = []
        for site in websites:
            all_domains_to_block.extend(get_domain_variations(site))
        
        with open(hosts_path, "r+") as file:
            content = file.read()
            file.seek(0, 2)  # Go to end of file
            for site in all_domains_to_block:
                entry = f"{redirect_ip} {site} {BLOCK_TAG}\n"
                if site not in content:
                    file.write(entry)
        return True, all_domains_to_block
    except Exception as e:
        print(f"Error blocking websites: {e}")
        return False, []

def unblock_websites(websites: List[str] = None):
    try:
        all_domains_to_unblock = []
        if websites:
            for site in websites:
                all_domains_to_unblock.extend(get_domain_variations(site))
        
        with open(hosts_path, "r+") as file:
            lines = file.readlines()
            file.seek(0)
            for line in lines:
                if BLOCK_TAG in line:
                    if websites is None:  # Unblock all
                        continue
                    else:  # Unblock specific websites
                        should_keep = True
                        for site in all_domains_to_unblock:
                            if site in line:
                                should_keep = False
                                break
                        if should_keep:
                            file.write(line)
                else:
                    file.write(line)
            file.truncate()
        return True
    except Exception as e:
        print(f"Error unblocking websites: {e}")
        return False

def auto_unblock_after_duration(websites: List[str], duration_minutes: int):
    def unblock_task():
        time.sleep(duration_minutes * 60)
        unblock_websites(websites)
        # Remove from active blocks
        for site in websites:
            if site in active_blocks:
                del active_blocks[site]
    
    thread = threading.Thread(target=unblock_task)
    thread.daemon = True
    thread.start()

# API Endpoints for website blocking
@app.post("/block_websites")
def block_websites_endpoint(request: BlockRequest):
    try:
        print(f"Attempting to block: {request.websites}")
        
        # Check if running as admin
        if not os.access(hosts_path, os.W_OK):
            return {
                "success": False,
                "message": "Permission denied. Run Python as Administrator to modify hosts file."
            }
        
        success, blocked_domains = block_websites(request.websites)
        if success:
            # Start auto-unblock timer
            auto_unblock_after_duration(request.websites, request.duration)
            
            # Store in active blocks
            for site in request.websites:
                active_blocks[site] = {
                    "blocked_at": time.time(),
                    "duration": request.duration,
                    "expires_at": time.time() + (request.duration * 60),
                    "blocked_domains": blocked_domains
                }
            
            return {
                "success": True,
                "message": f"Blocked {len(blocked_domains)} domains for {request.duration} minutes",
                "websites": request.websites,
                "blocked_domains": blocked_domains
            }
        else:
            return {
                "success": False,
                "message": "Failed to modify hosts file. Check permissions."
            }
    except Exception as e:
        print(f"Error in block_websites_endpoint: {e}")
        return {
            "success": False,
            "message": f"Error: {str(e)}"
        }

@app.post("/unblock_websites")
def unblock_websites_endpoint(request: UnblockRequest):
    try:
        success = unblock_websites(request.websites)
        if success:
            # Remove from active blocks
            for site in request.websites:
                if site in active_blocks:
                    del active_blocks[site]
            
            return {
                "success": True,
                "message": f"Unblocked websites",
                "websites": request.websites
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to unblock websites")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/blocked_websites")
def get_blocked_websites():
    current_time = time.time()
    # Clean expired blocks
    expired_sites = []
    for site, info in active_blocks.items():
        if current_time > info["expires_at"]:
            expired_sites.append(site)
    
    for site in expired_sites:
        del active_blocks[site]
    
    return {"blocked_websites": active_blocks}

# Existing question endpoints
@app.get("/question/{qid}")
def get_question(qid: int):
    for q in questions:
        if q["id"] == qid:
            return q
    return {"detail": "Question not found"}

@app.get("/random_question")
def get_random_question():
    return random.choice(questions)

@app.get("/questions")
def get_all_questions():
    return questions

@app.post("/update_xp")
def update_xp(points: int):
    return {"message": f"XP updated by {points}"}

@app.get("/")
def root():
    return {"message": "Website Blocker API is running"}

@app.get("/test")
def test():
    return {"status": "Backend is working"}

if __name__ == "__main__":
    import uvicorn
    print("Starting server at http://localhost:8000")
    uvicorn.run(app, host="localhost", port=8000)