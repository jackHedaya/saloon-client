import React from "react";

import "react-quill/dist/quill.snow.css";
import "./styles/Post.scss";
import ReactQuill from "react-quill";

export default function Post() {
  return (
    <div className="post">
      <div className="inner">
        <input className="post-title" placeholder="Title" />
        <ReactQuill
          theme="snow"
          modules={{ toolbar: [["bold", "italic", "underline", "strike"], ["link"]] }}
          formats={["bold", "italic", "underline", "strike", "link"]}
        />
      </div>
      <div className="collaborators">
        <div>Collaborators</div>
        <div className="section">
          <div className="title">Active</div>
        </div>
        <div className="section">
          <div className="title">Invited</div>
        </div>
      </div>
    </div>
  );
}
