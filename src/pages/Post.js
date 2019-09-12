import React from "react";

import "react-quill/dist/quill.snow.css";
import "./styles/Post.scss";
import ReactQuill from "react-quill";

export default function Post() {
  return (
    <div className="post">
      <Editor />
      <div className="collaborators">
        <div>Collaborators</div>
        <CollaboratorSection>Active</CollaboratorSection>
        <CollaboratorSection>Invited</CollaboratorSection>
      </div>
    </div>
  );
}

function Editor() {
  return (
    <div className="editor">
      <input className="post-title" placeholder="Title" />
      <ReactQuill
        theme="snow"
        modules={{ toolbar: [["bold", "italic", "underline", "strike"], ["link"]] }}
        formats={["bold", "italic", "underline", "strike", "link"]}
      />
    </div>
  );
}

function CollaboratorSection(props) {
  const { children } = props;

  return (
    <div className="section">
      <div className="title">{children}</div>
    </div>
  );
}
