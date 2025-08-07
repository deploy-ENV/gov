import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="p-2 rounded-full hover:bg-blue-900/40 transition flex items-center justify-center"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-300" />}
    </button>
  );
} 