/**
 * FeedbackPage Component - User feedback and suggestion submission interface
 * 
 * COMPONENTS USED:
 * - NavBar: Navigation header with user authentication
 * - ToolMainCard: Reusable card container for sections
 * - LenisScroll: Smooth scrolling wrapper
 * - FeedbackForm: Main feedback submission form component
 * - BugIcon, LightbulbIcon, StarIcon: Various UI icons
 * 
 * CUSTOM HOOKS:
 * - useFeedbackPageData: Fetches feedback page configuration
 * 
 * useState HOOKS:
 * - feedbackType: Current selected feedback category (bug/feature/suggestion)
 * - formData: Form input values (title, description, email, priority)
 * - isSubmitting: Loading state during form submission
 * - submitted: Success state after form submission
 * 
 * FUNCTIONS CREATED:
 * - handleInputChange: Updates form data on input changes
 * - handleSubmit: Processes form submission with API simulation
 * - getStatusColor: Returns CSS class based on feedback status
 * - getTypeIcon: Returns appropriate icon based on feedback type
 * 
 * FEATURES:
 * - Multi-type feedback submission (bugs, features, suggestions)
 * - Form validation and submission handling
 * - Statistics display (total submissions, implemented features)
 * - Recent feedback showcase with status indicators
 * - Feedback guidelines for users
 * - Responsive two-column layout
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../src/components/PreBuildComponts/navBar';
import ToolMainCard from '../src/components/PreBuildComponts/toolMainCard';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';
import FeedbackForm from '../src/components/FeedbackPage/FeedbackForm';
import { useFeedbackPageData } from '../src/hooks/useFeedbackPageData';
import { BugIcon, LightbulbIcon, StarIcon } from '../src/icons/index.jsx';

export default function FeedbackPage() {
  // CUSTOM HOOK FOR DATA FETCHING
  const { data: feedbackData, loading } = useFeedbackPageData(); // Feedback page configuration
  
  // STATE MANAGEMENT
  const [feedbackType, setFeedbackType] = useState('suggestion'); // Selected feedback category
  const [formData, setFormData] = useState({ // Form input values
    title: '',
    description: '',
    email: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Form submission loading state
  const [submitted, setSubmitted] = useState(false); // Form submission success state

  // Simple prototype data for forms first two blocks
  const feedbackTypes = [
    { id: 'bug', name: 'Bug Report' },
    { id: 'feature', name: 'Feature Request' },
    { id: 'suggestion', name: 'Suggestion' }
  ];

  // Priority json file or the properties

  const priorities = ['low', 'medium', 'high'];

  // Stats and recent feedback can be fetched from API in real implementation
  const stats = { totalSubmissions: 156, implemented: 23 };

  // Recent feedback can be fetched from API in real implementation
  const recentFeedback = [
    { id: 1, title: 'Dark mode support', type: 'feature', status: 'in-progress', votes: 45 },
    { id: 2, title: 'Timer bug fix', type: 'bug', status: 'completed', votes: 12 }
  ];
  // Guidelines for providing feedback
  const guidelines = [
    { title: 'Be Specific', description: 'Provide clear details about the issue or suggestion' },
    { title: 'Stay Focused', description: 'One topic per feedback submission' }
  ];
  //Handle input change means if change input this accts 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ title: '', description: '', email: '', priority: 'medium' });
    }, 2000);
    // After this much time, the form will reset.
  };

  //Color classes set by status
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'planned': return 'text-yellow-400';
      case 'under-review': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    // Tag wise icon set for button
    if (type === 'bug') return <BugIcon />;
    if (type === 'feature') return <LightbulbIcon />;
    return <StarIcon />;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <LenisScroll>
        <NavBar />

        {/* Header of the feedback section */}
        <section className="w-full pt-20 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl text-gray-800 mb-4">
                Feedback & Suggestions
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Help us improve by sharing your thoughts, reporting issues, or suggesting new features
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feedback Form in feedbackpage components folder */}
            <FeedbackForm
              feedbackTypes={feedbackTypes}
              priorities={priorities}
              feedbackType={feedbackType}
              setFeedbackType={setFeedbackType}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitted={submitted}
              setSubmitted={setSubmitted}
            />
            {/* Another column have submission and guildlines */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800">{stats.totalSubmissions}</div>
                  <div className="text-gray-600 text-sm">Total Submissions</div>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-teal-100 border border-green-300 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800">{stats.implemented}</div>
                  <div className="text-gray-600 text-sm">Implemented</div>
                </div>
              </div>

              {/* THis contents manual data must contains the real data for this make field */}
              <ToolMainCard width="100%" height="auto" title="Recent Feedback" subtitle="Latest community suggestions">
                <div className="p-6">
                  <div className="space-y-4">
                    {recentFeedback.map((feedback) => (
                      <div key={feedback.id} className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="text-purple-600">{getTypeIcon(feedback.type)}</div>
                            <h4 className="font-medium text-gray-800">{feedback.title}</h4>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full bg-gray-200 ${getStatusColor(feedback.status)}`}>
                            {feedback.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{feedback.votes} votes</span>
                          <span>2 days ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ToolMainCard>

              {/* Just normal things */}
              <ToolMainCard width="100%" height="auto" title="Feedback Guidelines" subtitle="How to write effective feedback">
                <div className="p-6 space-y-4">
                  {guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-purple-600"><StarIcon /></div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">{guideline.title}</h4>
                        <p className="text-gray-600 text-sm">{guideline.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ToolMainCard>
            </div>
          </div>
        </div>
      </LenisScroll>
    </div>
  );
}