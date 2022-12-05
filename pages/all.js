import ReactMarkdown from "react-markdown";
const gfm = require("remark-gfm");
// const textr = require('remark-textr')
const remarkCaption = require("remark-captions");
// import { useRouter } from "next/router";
import { motion } from "framer-motion";
// import Confetti from "react-canvas-confetti";
import db from "../bin/firestore.js";

import Link from "next/link";

function List({ posts }) {
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,

      transition: {
        duration: 1.2,

        // ease: easing
      },
    },
    exit: {
      y: 60,
      opacity: 0,
      width: "97.5vw",
      margin: "auto",
    },
  };

  return (
    <>
      <body className={"container"}>
        <motion.div
          className={"container-all"}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          exit={fadeInUp.exit}
          transition={{ delay: 1.5 }}
        >
          {posts.map((post) => (
            <>
              <div className={"allPosts"} key={post.id}>
                <Link href={`/${post.id}`} key={post.id}>
                  <a>
                    {post.name}, (passkey: {post.id})
                  </a>
                </Link>
              </div>
              <br />
            </>
          ))}
        </motion.div>
      </body>
    </>
  );
}

export const getServerSideProps = async () => {
  var docRef = db.collection("pages");

  var posts = [];
  await docRef.get(docRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  });
  return { props: { posts: posts } };
};

export default List;
