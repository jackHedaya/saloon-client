import React from "react";
import Interweave from "interweave";
import { UrlMatcher } from "interweave-autolink";

export default function ConfiguredInterweave(props) {
  return <Interweave matchers={[new UrlMatcher("url")]} {...props} />;
}
