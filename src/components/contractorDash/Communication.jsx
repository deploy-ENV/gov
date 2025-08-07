import React from 'react';

const Communication = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gold mb-4">Communication Hub</h2>
        <p className="text-gray-300">Stay connected with project managers and team members</p>
      </div>

      {/* Messages Section */}
      <div className="bg-navy/50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-teal mb-4">Recent Messages</h3>
        <div className="space-y-4">
          {/* Message cards will be mapped here */}
          <div className="bg-slate-surface/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">No messages yet</p>
          </div>
        </div>
      </div>

      {/* New Message Form */}
      <div className="bg-navy/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-teal mb-4">Send New Message</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recipient
            </label>
            <select 
              className="w-full bg-slate-surface/50 border border-gray-600 rounded-lg p-3 text-gray-300"
            >
              <option value="">Select recipient</option>
              <option value="project-manager">Project Manager</option>
              <option value="supervisor">Site Supervisor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              className="w-full bg-slate-surface/50 border border-gray-600 rounded-lg p-3 text-gray-300"
              placeholder="Enter message subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full bg-slate-surface/50 border border-gray-600 rounded-lg p-3 text-gray-300"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-gold to-teal text-navy px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Communication;
