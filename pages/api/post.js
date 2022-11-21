import db from "../../bin/firestore.js";

export default async (req, res) => {
  const { body } = req;

  var { passkey, pageData } = body;

  passkey = passkey.replace(/\s/g, "");

  passkey = passkey.toLowerCase();

  var docRef = db.collection("pages").doc(`${passkey}`);

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const update = db.collection("pages").doc(`${passkey}`).update({
          pageData: pageData,
        });
      } else {
        // doc.data() will be undefined in this case
        db.collection("pages").doc(`${passkey}`).set({
          pageData: pageData,
        });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  res.status(200).json({ status: "success" });
};
