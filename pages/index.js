import React, { useState } from "react";

import fetch from "isomorphic-fetch";

import { Input, Form, Button } from "antd";

import { motion } from "framer-motion";

import Link from "next/link";

const onFinishedFunction = async (values) => {
  const buttonDoc = document.querySelector("a");

  var linkToDoc = "";

  console.log(values);

  const { password, name } = values;

  await fetch("/api/register", {
    method: "POST",
    // redirect: 'follow',
    headers: {
      // Check what headers the API needs. A couple of usuals right below
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      passkey: password,
    }),
  }).then((response) => {
    if (response.redirected) {
      buttonDoc.setAttribute("href", response.url);
      buttonDoc.textContent = "View Document";
      linkToDoc = response.url;
    }
  });

  return linkToDoc;
};

export default function Home() {
  const [linkToDoc, updateLink] = useState("");

  return (
    <>
      <body className="body">
        <motion.div
          className="index-container"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            exit: { opacity: 0, transition: { duration: 0.5 } },
            initial: { opacity: 1 },
          }}
        >
          <h1>Blog</h1>
          <h3>Health Blog</h3>

          <Form
            onFinish={async (values) => {
              var daLink = await onFinishedFunction(values);
              updateLink(daLink);
            }}
            className="passkeyForm"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter your Name 😐😐",
                },
              ]}
            >
              <Input placeholder="Enter your name or a nickname"></Input>
            </Form.Item>
            <Form.Item
              label="Passkey"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter your passkey bro 😐😐",
                },
              ]}
            >
              <Input.Password placeholder="Enter the passkey given to you" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Link href={linkToDoc} className="buttonDoc">
                Enter a passkey
              </Link>
            </Form.Item>
          </Form>
        </motion.div>
      </body>
    </>
  );
}
