import React from 'react';
import NavBar from '../src/components/PreBuildComponts/navBar';
import UserProfileCard from '../src/components/CommunityPage/UserProfileCard';
import QuickLinksCard from '../src/components/CommunityPage/QuickLinksCard';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';
import { useCommunityData } from '../src/hooks/useCommunityData';

const ToolMainCard = ({ title, subtitle, children }) => {
    // THis is the main card for community contents the three things div header paragraph
    return (
        <div className="bg-white border-2 border-gray-300 p-4">
            {/* This is the main container that consis the global cards  */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
            </div>
            {/* Above contents is fixed shared & below content is used for dynamic data */}
            {children}
        </div>
    );
};

const CommunityFeed = () => {
    // THis is dummy json need to showe data by data bases
    const posts = [
        { id: 1, author: 'Alex Chen', time: '2h ago', content: 'Just completed a 4-hour focus session! The Pomodoro technique really works.', likes: 12, comments: 3 },
        { id: 2, author: 'Sarah Kim', time: '5h ago', content: 'Hit level 5 today! The XP system keeps me motivated to code daily.', likes: 8, comments: 2 },
        { id: 3, author: 'Mike Johnson', time: '1d ago', content: 'Anyone else struggling with distractions? The website blocker has been a game changer.', likes: 15, comments: 7 },
        { id: 4, author: 'Emma Davis', time: '2d ago', content: 'Loving the progress analytics. Seeing my improvement over time is so satisfying!', likes: 6, comments: 1 }
    ];
    //Return condition of the community feed
    return (
        <ToolMainCard title="Community Feed" subtitle="Explore, ask, and share">
            {/* Property are saved in card */}
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-3 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 rounded-2xl"
                    placeholder="Search the community..."
                />
            </div>
            {/* Children of the main card */}
            <div className="space-y-4">
                {posts.map(post => (
                    // Json wise post created
                    <div key={post.id} className="p-4 bg-purple-50 border-2 border-gray-300 rounded-2xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-600 border-2 border-purple-700 flex items-center justify-center text-white font-bold text-sm rounded-full">
                                {post.author[0]}
                                {/* This shows the fist latters of the authors */}
                            </div>
                            <div>
                                {/* Set the name of autohr and created the post of the author */}
                                <p className="font-bold text-gray-900 text-sm">{post.author}</p>
                                <p className="text-xs text-gray-600">{post.time}</p>
                            </div>
                        </div>
                        {/* This is the content of the post  */}
                        <p className="mt-3 text-gray-700 font-medium text-sm">{post.content}</p>
                        <div className="mt-3 flex items-center space-x-4 text-gray-600 text-xs">
                            <button className="flex items-center space-x-1 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 font-medium rounded-2xl px-2 py-1">
                                <span>👍</span>
                                {/*Clicker for likes */}
                                <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 font-medium rounded-2xl px-2 py-1">
                                <span>💬</span>
                                {/* Clicker for comments */}
                                <span>{post.comments}</span>
                                {/* Shows the number of comments */}
                                {/* Need to add comment sections */}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToolMainCard>
    );
};

const AskQuestionCard = () => {
    return (
        // Remain Logic is to add the post to main feed that is typed
        <ToolMainCard title="Ask Question" subtitle="Share knowledge">
            <div className='space-y-3'>
                {/* This container sets the data of the main container's child means toolMainCard's child */}
                <textarea
                    className="w-full h-20 p-3 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 text-sm"
                    placeholder="What's on your mind?"
                ></textarea>
                <input
                    type="text"
                    className="w-full p-3 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 text-sm"
                    placeholder="Add tags"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white font-normal hover:bg-purple-700 hover:scale-105 transition-all duration-300 border border-purple-600 text-sm rounded-2xl shadow-md hover:shadow-lg"
                >
                    Post
                </button>
            </div>
        </ToolMainCard>
    );
};

const TrendingTopics = () => {
    //Trnding topics are comes from ai models 
    const topics = ['Focus Techniques', 'Productivity Tips', 'Coding Challenges', 'Time Management', 'Goal Setting', 'Habit Building', 'Deep Work', 'Pomodoro'];

    return (
        <ToolMainCard title="Trending" subtitle="Popular topics">
            {/* Main card child contentainers */}
            <div className='flex flex-wrap gap-2'>
                {topics.map((topic, index) => (
                    <span
                        key={index}
                        className="bg-purple-100 text-purple-700 font-medium px-2 py-1 border border-purple-300 hover:bg-purple-200 transition-all duration-300 transform hover:scale-105 cursor-pointer text-xs rounded-2xl"
                    >
                        {topic}
                    </span>
                ))}
            </div>
        </ToolMainCard>
    );
};



export default function CommunityPage() {
    return (
        <div className="min-h-screen w-full bg-white text-gray-900 overflow-x-hidden">
            <LenisScroll>
                <NavBar />
                <section className='w-full py-8 px-4'>
                    {/* Main section contents the feed and whole page */}
                    <div className='w-full flex gap-4'>
                        <div className='w-1/5 space-y-4 overflow-hidden'>
                            <UserProfileCard />
                            {/* Above card is in the community folder in componets */}
                            <AskQuestionCard />
                            {/* Above card is in the given page */}
                        </div>

                        <div className='w-3/5'>
                            <CommunityFeed />
                            {/* THis is middle and main content of the */}
                        </div>

                        <div className='w-1/5 space-y-4 overflow-hidden'>
                            <QuickLinksCard ToolMainCard={ToolMainCard} />
                            {/* Above card is in the community folder in components */}
                            <TrendingTopics />
                            {/* Above card is in this page*/}
                        </div>
                    </div>
                </section>
            </LenisScroll>
        </div>
    );
}

// Community page desgin over some things needs to change
// -> Add comment sections
// -> Add icons
// -> Change path of the hooks
// -> Ask Question must post after clicking the button