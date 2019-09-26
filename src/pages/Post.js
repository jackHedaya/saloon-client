import React, { useState } from "react";
import Avatar from "react-avatar";
import { Spinner } from "reactstrap";
import { FiArrowRightCircle } from "react-icons/fi";

import ConfiguredQuill from "../components/ConfiguredQuill";

import * as conversationService from "../services/conversation.service";
import useAuth from "../hooks/useAuth";

import { randomColor } from "../_helpers";

import "./styles/Post.scss";
import "react-quill/dist/quill.snow.css";

export default function Post(props) {
  const [token] = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [submitting, setSubmitting] = useState(false);

  function uploadPost() {
    setSubmitting(true);

    conversationService
      .postConversation(token, { title, body })
      .then(data => {
        setSubmitting(false);
        props.history.push(`/conversation/${data.convo_id}`);
      })
      .catch(_ => {
        setSubmitting(false);
      });
  }

  return (
    <div className="post">
      <Editor title={title} setTitle={setTitle} body={body} setBody={setBody} />
      <div className="collaborators">
        <div>Collaborators</div>
        <CollaboratorSection color="gray">Invited</CollaboratorSection>
        <Invite />
        <div className="post-button" onClick={uploadPost}>
          {!submitting ? (
            <div className="text">Post</div>
          ) : (
            <Spinner
              css={`
                width: 50px;
                height: 50px;
                flex: 1;
              `}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Editor(props) {
  const { title, setTitle, body, setBody } = props;

  return (
    <div className="editor">
      <input className="post-title" placeholder="Title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
      <ConfiguredQuill value={body} onChange={val => setBody(val)} />
    </div>
  );
}

function CollaboratorSection(props) {
  const { color, children } = props;

  return (
    <div className="section">
      <div className="title">{children}</div>
      <div className="users">
        <Collaborator color={color}>Jack Hedaya</Collaborator>
        <Collaborator color={color}>Abe Kassin</Collaborator>
        <Collaborator color={color}>Judah Kishk</Collaborator>
      </div>
    </div>
  );
}

function Collaborator(props) {
  const { color = undefined } = props;
  return (
    <div className="user">
      <Avatar name={props.children} src={props.image || null} color={randomColor(props.children)} round size={25} />
      <span className="name" style={{ color }}>
        {props.children}
      </span>
    </div>
  );
}

function Invite(props) {
  return (
    <div className="invite">
      <div className="title">Invite Someone</div>
      <div className="field">
        <input className="clear-input" placeholder="username" autoComplete="off" />
        <FiArrowRightCircle className="submit" />
      </div>
    </div>
  );
}
