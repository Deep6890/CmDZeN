/**
 * BlogPage Component - Main blog listing and filtering interface
 * 
 * COMPONENTS USED:
 * - NavBar: Navigation header with user authentication
 * - Link: React Router navigation component
 * 
 * FUNCTIONS CREATED:
 * - setSelectedCategory: Updates active category filter
 * - filteredPosts: Filters blog posts by selected category
 * - featuredPosts: Extracts featured blog posts
 * 
 * useState HOOKS:
 * - selectedCategory: Tracks currently selected blog category filter
 * 
 * FEATURES:
 * - Category-based blog post filtering
 * - Responsive grid layout for posts
 * - Conditional "Read More" button based on content availability
 * - Navigation to individual blog detail pages
 * - Featured posts highlighting
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../src/components/PreBuildComponts/navBar';

export default function BlogPage() {
  // STATE MANAGEMENT
  const [selectedCategory, setSelectedCategory] = useState('all'); // Current active category filter

  // STATIC DATA ARRAYS
  const categories = ['all', 'productivity', 'focus', 'coding', 'tips']; // Available blog categories

  // BLOG POSTS DATA - Should be replaced with API call in production

  const blogPosts = [
    {
      id: 1,
      title: "Master the Pomodoro Technique for Better Focus",
      excerpt: "Learn how to use the Pomodoro Technique to boost your productivity and maintain deep focus during coding sessions.",
      content: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals. Here's how to master it:\n\n1. Choose a task you want to work on\n2. Set a timer for 25 minutes\n3. Work on the task until the timer rings\n4. Take a short 5-minute break\n5. Repeat the process\n\nAfter 4 pomodoros, take a longer break of 15-30 minutes. This technique helps maintain focus and prevents burnout while coding.",
      category: "productivity",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Building Coding Habits That Stick",
      excerpt: "Simple strategies to develop consistent coding habits and improve your programming skills daily.",
      content: "Building lasting coding habits requires consistency and the right approach:\n\n• Start small - commit to just 15 minutes daily\n• Use habit stacking - code after an existing habit\n• Track your progress visually\n• Celebrate small wins\n• Focus on consistency over perfection\n\nRemember, it takes 21 days to form a habit and 90 days to create a lifestyle. Be patient with yourself and focus on showing up every day.",
      category: "coding",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 3,
      title: "Quick Focus Tips",
      excerpt: "Short tips to improve focus instantly.",
      category: "tips",
      author: "Alex Smith",
      date: "2024-01-10",
      readTime: "2 min read",
      featured: false
    }
    
  ];
  
  // COMPUTED VALUES AND FILTERS
  /**
   * Filter blog posts based on selected category
   * Returns all posts if 'all' is selected, otherwise filters by category
   */
  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  /**
   * Extract featured posts for potential highlighting
   * Currently not used in UI but available for featured section
   */
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Navigation bar at the top */}
      <NavBar />

      <section className="pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-gray-800 mb-4">Productivity Blog</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">Tips, insights, and strategies to boost your focus and productivity</p>

          <div className="flex justify-center gap-4 mb-12">
            {/* Category wise press wise function shows appropriate blog */}
            {categories.map((category) => (
              <button
                // Set Category
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-2xl font-normal transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Section of button ended */}

      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl text-center mb-12 text-gray-800">
            {/* Set filter header of the filter content */}
            {selectedCategory === 'all' ? 'All Posts' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Posts`}
          </h2>
          {/* This container is for show filtered posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* This map functions sayed that post is filtered and shown */}
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="mb-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  {/* Post wise autor name and time */}
                  <span>By {post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                {/* If post content property of  json atribute is ther it shows buton other wise no button displaya */}
                {post.content && (
                  <div className="mt-4">
                    <Link
                      to={`/blog/${post.id}`}
                      state={{ post }}
                      className="inline-block px-4 py-2 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg font-normal"
                    >
                      Read More
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
// Main Logic is fitted for this blogDetailsPage.jsx file