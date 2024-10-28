import React from 'react';

function DashboardContent({ activeNav, darkMode }) {
  return (
    <div>
      {activeNav === 'dashboard' && (
        <div>
          {" Dashboard content here" }
        </div>
      )}
      {activeNav === 'ai-recommendations' && (
        <div className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md`}>
          <h2 className="text-xl font-bold">AI-Driven SEO Recommendations</h2>
          <ul className="list-disc pl-6">
            <li>Optimize meta descriptions for product pages</li>
            <li>Acquire backlinks from high-authority sites</li>
            <li>Conduct a comprehensive site audit</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Delegate to SEO Consultant</button>
        </div>
      )}
      {/* Other sections */}
    </div>
  );
}

export default DashboardContent;
