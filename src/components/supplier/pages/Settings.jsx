import React, { useState, useEffect } from "react";

const languages = ["English", "Hindi", "Bengali", "Tamil", "Telugu"];

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [language, setLanguage] = useState(languages[0]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      <div className="rounded-xl bg-[#1A1F36]/80 border border-gray-700 shadow-md backdrop-blur-md p-8 text-gray-300 space-y-8 w-full">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Enable Notifications</span>
          <button
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${notifications ? "bg-emerald-500" : "bg-gray-600"}`}
            onClick={() => setNotifications((n) => !n)}
            aria-label="Toggle notifications"
          >
            <span
              className={`h-6 w-6 bg-white rounded-full shadow transform transition-transform ${notifications ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Theme Mode</span>
          <select
            className="px-4 py-2 rounded-lg bg-[#23294a] text-gray-200 border border-gray-700 focus:outline-none"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Language Preference</span>
          <select
            className="px-4 py-2 rounded-lg bg-[#23294a] text-gray-200 border border-gray-700 focus:outline-none"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {languages.map(l => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 