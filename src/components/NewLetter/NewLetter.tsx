import React, { useState } from "react";
import ReactQuill from "react-quill";

import s from "./NewLetter.module.scss";
import "react-quill/dist/quill.snow.css";
import "./quill.css";

import { baseUrl } from "../../assets/vars";
import axios from "axios";
import { encodeBase64 } from "../../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface NewLetterProps {
  toggleNewLetter: () => void;
  getEmails: () => void;
}
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
];

const NewLetter = ({ toggleNewLetter, getEmails }: NewLetterProps) => {
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [topic, setTopic] = useState("");
  const userAuthString = localStorage.getItem("userDataAuth");
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const currentUserId = useSelector((state: RootState) => state.emails.userId);
  const currentUserEmail = useSelector(
    (state: RootState) => state.emails.currentUser
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let parser = new DOMParser();
    let message = parser
      .parseFromString(value, "text/html")
      .body.querySelector("p")
      ?.innerHTML.toString();
    const data = {
      sender: currentUserId,
      recipient,
      subject: topic,
      message: message,
    };
    if (userAuth && userAuth.username && userAuth.password) {
      const base64Auth = encodeBase64(userAuth.username, userAuth.password);
      if (!value || !recipient || !topic || !currentUserId) return;
      try {
        await axios.post(`${baseUrl}emails/`, data, {
          headers: {
            Authorization: `Basic ${base64Auth}`,
          },
        });
        toggleNewLetter();
        getEmails();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div onClick={toggleNewLetter} className={s.overlay}>
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className={s.form}>
          <button onClick={toggleNewLetter} className={s.closeBtn}></button>
          <label className={s.username}>{currentUserEmail}</label>
          <label>
            To whom
            <input
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
              className={s.input}
              type="email"
            />
          </label>

          <label>
            Topic
            <input
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
              className={s.input}
              type="text"
            />
          </label>

          <ReactQuill
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default NewLetter;
