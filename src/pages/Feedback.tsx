import { useState } from 'react';
import { Feedback as FeedbackType } from '../types';

const Feedback = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    category: 'suggestion' as FeedbackType['category'],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedback: FeedbackType = {
      id: crypto.randomUUID(),
      ...formData,
      created_at: new Date().toISOString(),
    };

    // Store in localStorage for admin to see
    const existingFeedback = JSON.parse(localStorage.getItem('jharYatraFeedback') || '[]');
    localStorage.setItem('jharYatraFeedback', JSON.stringify([...existingFeedback, feedback]));

    setSubmitted(true);
    setFormData({
      user_name: '',
      user_email: '',
      category: 'suggestion',
      message: '',
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-offwhite dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Feedback
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you! Your feedback helps us build a better experience for everyone.
          </p>
        </div>

        <div className="rounded-3xl bg-offwhite dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8 sm:p-10">
            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">Thank you!</h3>
                <p className="text-emerald-700 dark:text-emerald-300">Your feedback has been received. We appreciate your input!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="user_name" className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      id="user_name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-offwhite dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                      placeholder="Your name"
                      value={formData.user_name}
                      onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      id="user_email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-offwhite dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                      placeholder="your@email.com"
                      value={formData.user_email}
                      onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-offwhite dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as FeedbackType['category'] })}
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="bug">Report a Bug</option>
                    <option value="praise">Praise</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-offwhite dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-none transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

