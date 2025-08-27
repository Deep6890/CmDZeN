import React from 'react';
import { BugIcon, LightbulbIcon } from '../../icons/index.jsx';

function ToolMainCard({ title, subtitle, children }) {
  return (
    <div className="border-2 border-purple-600 bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export default function FeedbackForm() {
  // THis sets the freedback types
  const [feedbackType, setFeedbackType] = React.useState('bug');
  // Sets the priorities and data of the forms
  const [formData, setFormData] = React.useState({ title: '', description: '', priority: 'medium', email: '' });

  const [submitted, setSubmitted] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);

  // Jsons 
  const feedbackTypes = [
    { id: 'bug', name: 'Bug Report', description: 'Report a technical issue' },
    { id: 'feature', name: 'Feature Request', description: 'Suggest a new feature' }
  ];
  // Priorites set in frontend it works but must stored in data bases
  const priorities = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.title.trim() && formData.description.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <ToolMainCard width="100%" height="auto" title="Submit Feedback" subtitle="Share your thoughts with us">
          <div className="p-6">
            {!submitted ? (
              <div className="space-y-6">

                <div>
                  <label className="block text-gray-900 font-medium mb-3">Feedback Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {feedbackTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFeedbackType(type.id)}
                        className={`border-2 bg-white p-4 rounded-2xl transition-all duration-200 text-left hover:border-purple-600 hover:scale-105 shadow-md hover:shadow-lg ${feedbackType === type.id
                          ? 'border-purple-600'
                          : 'border-black'
                          }`}
                      >
                        {/* Icon for feedback type */}
                        <div className="mb-2 text-purple-600">
                          {type.id === 'bug' ? <BugIcon /> : <LightbulbIcon />}
                        </div>
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors duration-200"
                    placeholder="Brief description of your feedback"
                    required
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 resize-none transition-colors duration-200"
                    placeholder="Provide detailed information about your feedback..."
                    required
                  />
                </div>

                {/* Priority Input */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-gray-900 focus:outline-none focus:border-purple-600 transition-colors duration-200"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors duration-200"
                    placeholder="Get updates on your feedback"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !isFormValid}
                  onClick={handleSubmit}
                  className={`w-full px-6 py-3 border-2 transition-all duration-200 font-normal rounded-2xl shadow-md ${isFormValid && !submitting
                    ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:scale-105 hover:shadow-lg'
                    : 'bg-gray-400 text-gray-200 border-gray-400 cursor-not-allowed'
                    }`}
                >
                  {/* Submit Button Text */}
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            ) : (
              // Submission Successful State
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">Your feedback has been submitted successfully.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-purple-600 text-white border-2 border-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-200 rounded-2xl shadow-md hover:shadow-lg font-normal"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </ToolMainCard>
      </div>
    </div>
  );
}

// Feedback Form Component
// This component handles the feedback submission form
// Some of the key may need to be stored in a database and retrieved later