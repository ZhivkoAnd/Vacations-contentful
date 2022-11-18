import Footer from "./Footer";
import { useState } from "react";
import Navigation2 from "./Navigation2";

export default function Layout({ children }) {
  const [colorMode, setColorMode] = useState("dark");

  const lightMode = () => {
    setColorMode("light");
  };

  const darkMode = () => {
    setColorMode("dark");
  };

  return (
    <div className={`App ${colorMode}`}>
      <Navigation2 lightMode={lightMode} darkMode={darkMode} />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}
