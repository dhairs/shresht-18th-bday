import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/testing.css";

import Head from "next/head";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";

// import firebase from "../bin/firebase";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Shresht's Birthday</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
            pageExit: {
              opacity: 0,
            },
          }}
          transition={{
            staggerChildren: 0.5,
            // delay: 1,
            // x: { type: "spring", stiffness: 100 },
            default: { duration: 0.3 },
          }}
        >
          <Component {...pageProps} key={router.route} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
