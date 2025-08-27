// Simple configuration - no JSON files
export const config = {
  api: {
    baseUrl: "http://localhost:3001/api",
    endpoints: {
      auth: "/auth",
      user: "/user", 
      progress: "/progress"
    }
  },
  xp: {
    defaultPoints: 0,
    questionPoints: 10
  },
  codingPlatforms: [
    { name: "LeetCode", url: "https://leetcode.com" },
    { name: "HackerRank", url: "https://hackerrank.com" },
    { name: "CodeChef", url: "https://codechef.com" },
    { name: "Codeforces", url: "https://codeforces.com" }
  ]
};