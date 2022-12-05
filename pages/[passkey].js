import ReactMarkdown from "react-markdown";
const gfm = require("remark-gfm");
// const textr = require('remark-textr')
const remarkCaption = require("remark-captions");
// import { useRouter } from "next/router";
import { motion } from "framer-motion";
// import Confetti from "react-canvas-confetti";
import db from "../bin/firestore.js";

const firebase = require("firebase/app");
require("firebase/firestore");

function Post({ markdown, name }) {
  const finalString = `##### This message is from ${name} -- (Go Back) [/all]

${markdown}
`;

  // const easing = [.6, -.05, 0.01, .99]

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
          <div className="secondContainer">
            <ReactMarkdown
              plugins={[gfm, remarkCaption]}
              source={finalString}
            />
          </div>
        </motion.div>
      </body>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  var { passkey } = params;
  passkey = passkey.toLowerCase();

  var docRef = db.collection("pages").doc(`${passkey}`);

  var pageData;
  var name;

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().pageData) {
        pageData = doc.data().pageData;
        name = doc.data().name;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        pageData = "# There's nothing here!";
        name = "No one D:";
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      pageData = "Error retrieving data";
    });
  return { props: { markdown: pageData, name: name } };
};

export default Post;
