import db from "../../bin/firestore.js";

export default async (req, res) => {
  var pageData;

  const { body } = req;

  var { passkey } = body;

  passkey = passkey.replace(/\s/g, "");

  passkey = passkey.toLowerCase();

  var docRef = db.collection("pages");

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        pageData = doc.data().pageData;
        res.status(200).json({ data: pageData });
      } else {
        // doc.data() will be undefined in this case
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.status(400).json({ data: "Error loading data" });
    });
};
