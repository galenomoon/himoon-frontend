import React, { createContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextProviderProps {
  children: ReactNode;
}

interface ContextProps {
  isDarkMode: boolean;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  isDarkMode: false,
  switchTheme: () => {}
});

export default function ThemeProvider({ children }: ThemeContextProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      setIsDarkMode(JSON.parse(isDarkMode));
    }
  }, []);

  function switchTheme() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
