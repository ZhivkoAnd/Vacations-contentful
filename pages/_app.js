import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../components/vacationPanel.scss";
import "../components/global/navigation.scss";
import "../components/global/footer.scss";
import "../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import Layout from "../components/global/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps, router }) {
  const [queryClient] = useState(() => new QueryClient());
  const [colorMode, setColorMode] = useState("dark");

  const lightMode = () => {
    setColorMode("light");
  };

  const darkMode = () => {
    setColorMode("dark");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: { opacity: 0 },
          pageAnimate: { opacity: 1 },
        }}
      >
        <div className={`App ${colorMode}`}>
          <Layout lightMode={lightMode} darkMode={darkMode}>
            <Component {...pageProps} />
          </Layout>
        </div>
      </motion.div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
