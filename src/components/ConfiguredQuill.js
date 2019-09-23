import React from "react";
import ReactQuill from "react-quill";

export default function ConfiguredQuill(props) {
  const { value, setValue, ...otherProps } = props;

  return (
    <ReactQuill
      theme="snow"
      modules={{ toolbar: [["bold", "italic", "underline", "strike"], ["link"]] }}
      formats={["bold", "italic", "underline", "strike", "link"]}
      value={value || ""}
      onChange={x => setValue(x)}
      {...otherProps}
    />
  );
}
