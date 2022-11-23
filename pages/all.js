import ReactMarkdown from "react-markdown";
const gfm = require("remark-gfm");
// const textr = require('remark-textr')
const remarkCaption = require("remark-captions");
// import { useRouter } from "next/router";
import { motion } from "framer-motion";
// import Confetti from "react-canvas-confetti";
import db from "../bin/firestore.js";

function List({ posts }) {
  console.log(posts);
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
      width: "97.5vw",
      margin: "auto",
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

  const listItems = posts.map((post) => (
    <div className="secondContainer" key={post}>
      <a href={`/${post}`} key={post}>
        {post}
      </a>
    </div>
  ));

  return (
    <>
      <body className={"container"}>
        <motion.div
          className={"container"}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          exit={fadeInUp.exit}
          transition={{ delay: 1.5 }}
        >
          {listItems}
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
      console.log(doc.id, " => ", doc.data());
      posts.push(doc.id);
    });
  });
  return { props: { posts: posts } };
};

export default List;
