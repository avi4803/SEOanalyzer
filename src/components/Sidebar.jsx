import React, { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
  { id: 'ai-recommendations', label: 'AI Recommendations', icon: 'fas fa-robot' },
  { id: 'keyword-research', label: 'Keyword Research', icon: 'fas fa-key' },
  { id: 'serp-analysis', label: 'SERP Analysis', icon: 'fas fa-chart-line' },
  { id: 'competitors', label: 'Competitors', icon: 'fas fa-users' },
  { id: 'rank-tracking', label: 'Rank Tracking', icon: 'fas fa-chart-bar' },
  { id: 'alerts', label: 'Alerts', icon: 'fas fa-bell' },
  { id: 'automation', label: 'Automation', icon: 'fas fa-cogs' },
  { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
];

function Sidebar({ activeNav, setActiveNav, darkMode, setDarkMode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`relative ${
          isSidebarVisible ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md h-screen flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {/* Sidebar Title or Logo */}
          {isSidebarVisible && <h1 className="text-xl font-bold">SEO Dashboard</h1>}

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className={`absolute right-0 top-4 transition-transform duration-300 ease-in-out ${
              isSidebarVisible ? 'translate-x-0' : '-translate-x-12'
            } bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-2`}
            title={isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            <i className={`fas ${isSidebarVisible ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>
        </div>

        {/* Sidebar Navigation */}
        {isSidebarVisible && (
          <nav className="mt-4">
            <ul>
              {navItems.map(({ id, label, icon }) => (
                <li
                  key={id}
                  className={`flex items-center p-4 cursor-pointer ${
                    activeNav === id ? 'text-blue-600 bg-blue-100' : ''
                  }`}
                  onClick={() => setActiveNav(id)}
                >
                  <i className={`${icon} mr-3`}></i>
                  <span>{label}</span>
                </li>
              ))}
              {/* Dark Mode Toggle */}
              <li className="flex items-center justify-between p-4 cursor-pointer">
                <span className="mr-3">Dark Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-6 flex items-center  ${darkMode ? 'bg-blue-600':'bg-gray-300'} rounded-full p-1 transition duration-300 ${
                    darkMode ? 'bg-blue-600' : ''
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform ${
                      darkMode ? 'translate-x-4' : ''
                    } transition duration-300`}
                  ></div>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </aside>

    {/* Main Content Area 
      <div className="flex-1 p-4">
       Main content goes here 
        <h2 className="text-2xl font-semibold">Content Area</h2>
      </div> */}
    </div>
  );
}

export default Sidebar;
