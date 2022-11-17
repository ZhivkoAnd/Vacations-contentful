import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../components/vacationPanel.scss";
import Layout from "../components/global/Layout";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: { opacity: 0 },
        pageAnimate: { opacity: 1 },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </motion.div>
  );
}

export default MyApp;
