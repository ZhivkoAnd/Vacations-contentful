import Footer from "./Footer";

import Navigation from "./Navigation";

export default function Layout({ children, lightMode, darkMode }) {
  return (
    <div>
      <Navigation lightMode={lightMode} darkMode={darkMode} />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}
