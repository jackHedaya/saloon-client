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
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [invited, setInvited] = useState([]);
  const addInvited = newUser => (!invited.includes(newUser) ? setInvited([...invited, newUser]) : null);

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
        <CollaboratorSection color="gray" invited={invited}>
          Invited
        </CollaboratorSection>
        <Invite inviteUser={addInvited} />
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
  const { color, invited, children } = props;

  return (
    <div className="section">
      <div className="title">{children}</div>
      <div className="users">
        {invited.map(invite => (
          <Collaborator key={`invite/${invite}`} color={color}>
            {invite}
          </Collaborator>
        ))}
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
  const [user, setUser] = useState("");

  let inputRef;
  const inviteUser = () => {
    props.inviteUser(user);
    setUser("");
    inputRef.focus();
  };

  return (
    <div className="invite">
      <div className="title">Invite Someone</div>
      <div className="field">
        <input
          className="clear-input"
          placeholder="username"
          autoComplete="off"
          value={user}
          onChange={e => setUser(e.currentTarget.value)}
          onKeyDown={e => (e.key === "Enter" ? inviteUser() : null)}
          ref={input => (inputRef = input)}
        />
        <FiArrowRightCircle className="submit" onClick={inviteUser} />
      </div>
    </div>
  );
}
