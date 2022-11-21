import db from "../../bin/firestore.js";

export default (req, res) => {
  const { body } = req;

  var { passkey, name } = body;

  passkey = passkey.replace(/\s/g, "");

  passkey = passkey.toLowerCase();

  if (passkey.startsWith("edit"))
    return res.redirect(`/page/${passkey.replace("edit", "")}`);

  if (!passkey.startsWith("create")) return res.redirect(`/${passkey}`);

  passkey = passkey.replace("create", "");

  var docRef = db.collection("pages").doc(`${passkey}`);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).redirect(`/page/${passkey}`);
      } else {
        const update = db.collection("pages").doc(`${passkey}`).set({
          name: name,
        });

        res.status(200).redirect(`/page/${passkey}`);
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);

      res.status(400).json({ data: "Error loading data" });
    });
};
