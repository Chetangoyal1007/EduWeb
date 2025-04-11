import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const DarkMode = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark" // Default to dark mode
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <BiSolidSun
          className="text-2xl cursor-pointer"
          onClick={() => setTheme("light")}
          title="Switch to Light Mode"
        />
      ) : (
        <BiSolidMoon
          className="text-2xl cursor-pointer"
          onClick={() => setTheme("dark")}
          title="Switch to Dark Mode"
        />
      )}
    </>
  );
};

export default DarkMode;
