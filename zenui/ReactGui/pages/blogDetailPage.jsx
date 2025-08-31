/**
 * BlogDetailPage Component - Individual blog post display with full content
 * 
 * COMPONENTS USED:
 * - NavBar: Navigation header with user authentication
 * - LenisScroll: Smooth scrolling wrapper for enhanced UX
 * - StarIcon: Star icon for key takeaways
 * - TimerIcon: Clock icon for read time display
 * - UserIcon: User avatar icon for author section
 * 
 * REACT ROUTER HOOKS:
 * - useLocation: Access passed post data from BlogPage
 * - useNavigate: Navigation back to blog listing
 * 
 * FUNCTIONS CREATED:
 * - navigate('/blog'): Returns to main blog page
 * - Back button handler
 * - Continue reading navigation
 * 
 * FEATURES:
 * - Full blog post content display
 * - Author information and metadata
 * - Key takeaways section with highlights
 * - Inspirational quote section
 * - Navigation breadcrumbs
 * - Responsive typography and layout
 */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../src/components/PreBuildComponts/navBar';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';
import { StarIcon, TimerIcon, UserIcon } from '../src/icons/index.jsx';

export default function BlogDetailPage() {
  // ROUTER HOOKS
  const location = useLocation(); // Access passed state from BlogPage
  const navigate = useNavigate(); // Navigation function
  
  // POST DATA - Retrieved from navigation state or fallback
  const post = location.state?.post || {
    id: 1,
    title: "Default Post Title",
    content: "This is the default post content. The actual post content would be displayed here with full details, images, and formatting.",
    author: "Author Name",
    date: "2024-01-15",
    readTime: "5 min",
    category: "General"
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <LenisScroll>
        {/* The navbar at the startinng of the page */}
        <NavBar />
        
        
        <section className="w-full pt-20 pb-8 px-6">
          <div className="max-w-4xl mx-auto">

            <button 
              onClick={() => navigate('/blog')}
              className="mb-6 text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center gap-2"
            >
              ← Back to Blog
            </button>
            

            <div className="flex items-center gap-4 mb-6">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500">{post.date}</span>
              <span className="text-gray-500 flex items-center gap-1">
                <TimerIcon /> {post.readTime}
              </span>
            </div>
            

            <h1 className="text-4xl md:text-5xl text-gray-800 mb-6">
              {post.title}
            </h1>
            

            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="text-purple-600">
                  <UserIcon />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {post.author}
                </p>
                <p className="text-gray-500 text-sm">
                  Published on {post.date}
                </p>
              </div>
            </div>
          </div>
        </section>
        

        <section className="w-full pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">

              <div className="text-gray-700 leading-relaxed space-y-6" style={{fontSize: '18px', lineHeight: '1.8'}}>

                {post.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  )
                ))}
                

                <div className="mt-12 p-8 bg-purple-50 rounded-2xl border border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="text-purple-600"><StarIcon /></div>
                      Focus and productivity go hand in hand
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="text-purple-600"><StarIcon /></div>
                      Small consistent improvements lead to big results
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="text-purple-600"><StarIcon /></div>
                      Track your progress to stay motivated
                    </li>
                  </ul>
                </div>
                

                <div className="mt-12 text-center">
                  <p className="text-lg text-gray-600 italic">
                    "The journey of a thousand miles begins with a single step. Start your focus journey today."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        <section className="w-full py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Continue Reading
            </h3>
            <p className="text-gray-600 mb-8">
              Explore more articles to enhance your productivity journey
            </p>
            <button 
              onClick={() => navigate('/blog')}
              className="bg-purple-600 text-white px-8 py-3 rounded-2xl hover:bg-purple-700 hover:scale-105 transition-all duration-300 font-normal shadow-md hover:shadow-lg"
            >
              View All Posts
            </button>
          </div>
        </section>
      </LenisScroll>
    </div>
  );
}