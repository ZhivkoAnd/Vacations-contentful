import Navigation from "./Navigation";
import Footer from "./Footer";
import { useState } from "react";

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
      <Navigation lightMode={lightMode} darkMode={darkMode} />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}
