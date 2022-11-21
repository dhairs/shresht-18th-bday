import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import Link from "next/link";

import React, { useState } from "react";
import { Button } from "antd";
import fetch from "isomorphic-fetch";
import db from "../../bin/firestore.js";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
// const { Plugins } = dynamic(() => { import('react-markdown-editor-lite')})
const mdParser = new MarkdownIt(/* Markdown-it options */);
// const Plugins = dynamic(() => import('react-markdown-editor-lite'))

var currentData; // this is mainly used to push the information/data to the server once someone is done typing
var saveDateTimestamp = Date.now() / 1000;

var password;

async function saveToDatabase(currentData) {
  await fetch("/api/post", {
    method: "POST",
    redirect: "follow",
    headers: {
      // Check what headers the API needs. A couple of usuals right below
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageData: currentData,
      passkey: password,
    }),
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
  return true;
}

function handleEditorChange({ text, value }) {
  // preRenderValue = text;

  const databaseStatus = document.getElementById("database-status");
  var currentTime = Date.now() / 1000;
  currentData = text;
  databaseStatus.textContent = `Saving to Database... [${password}]`;
  if (currentTime - saveDateTimestamp >= 5) {
    saveDateTimestamp = Date.now() / 1000;
    saveToDatabase(currentData).then((args) => {
      databaseStatus.textContent = `Saved to Database [${password}]`;
    });
  }
}

function buttonSubmit() {
  const databaseStatus = document.getElementById("database-status");
  saveToDatabase(currentData).then((promise) => {
    databaseStatus.textContent = `Saved to Database [${password}]`;
  });
}

function delayedUpdate(currentData) {
  setTimeout(() => {
    saveToDatabase(currentData);
  }, 4000);
  return true;
}

async function getCurrentData(password) {
  var docRef = db.collection("pages").doc(`${password}`);
  var pageData;
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        pageData = doc.data().pageData;
      } else {
        // window.href = "/"
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return pageData;
}

export const getServerSideProps = async ({ params }) => {
  const { passkey } = params;
  var data = await getCurrentData(passkey);
  if (data == undefined) data = "";
  return { props: { preRenderValue: data } };
};

function Editor({ preRenderValue }) {
  const router = useRouter();
  const { passkey } = router.query;
  password = passkey;
  var newPreValue = preRenderValue;
  const [value, setValue] = useState(newPreValue);

  return (
    <>
      <div className="markdown-editor">
        <h4 id="database-status" className="white">
          Saved to Database [passkey: {password}]
        </h4>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={(text) => {
            setValue(text.text);
            handleEditorChange(text);
          }}
          value={value}
        />
        <Button type="primary" onClick={buttonSubmit}>
          Submit
        </Button>
        <Link href={`/${password}`}>
          <Button
            type="link"
            className="secondarybuttonPage"
            href={`/${passkey}`}
          >
            View page
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Editor;
