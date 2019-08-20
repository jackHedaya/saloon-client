import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";

import { randomColor } from "../_helpers"

import "./styles/Conversation.scss";

function FAKE_FETCH(id) {
  if (!id === "73ba0853-0324-430d-87ab-8c6355b15df2") return;

  return {
    title: "An Extremely Controversial Topic",
    views: "1.1M views",
    votes: "10K upvotes",
    contributorCount: "19 contributors",
    contributors: [
      { username: "johnny_appleseed", first_name: "Johnny", last_name: "Appleseed", email: "john@seedfund.com" },
      { username: "billy_joel", first_name: "Billy", last_name: "Joel", email: "billy@joelmusic.com" },
      { username: "jack_hedaya", first_name: "Jack", last_name: "Hedaya", email: "jackehedaya@gmail.com" },
      { username: "prince_of_darkness", first_name: "Satan", last_name: "Evil", email: "satan@hell.edu" }
    ],
    postCount: "29 posts",
    posts: [
      {
        contributor: "Jack Hedaya",
        post: "I am a proud member of Medium and Quora, but I must say Saloon is just so much better!",
        time_of_post: "9 hours ago"
      },
      {
        contributor: "Satan",
        post:
          "You have no idea what you're talking about. You can only use one and that is that. Choose or forever burn in hell.",
        time_of_post: "9 hours ago"
      },
      {
        contributor: "Jack Hedaya",
        post: "Only Sith Lords deal in absolutes!",
        time_of_post: "9 hours ago"
      }
    ],
    comments: [
      { contributor: "Abraham Kassin", body: "Satan has a good point there", time_of_comment: "9 hours ago" },
      { contributor: "Creepy Demon #4", body: "Go get 'em boss!", time_of_comment: "9 hours ago" }
    ]
  };
}

function Conversation(props) {
  const id = props.match.params;

  const data = FAKE_FETCH(id);

  return (
    <div>
      <Discussion posts={data.posts} />
      <Title title={data.title} />
      <Comments comments={data.comments} />
    </div>
  );
}

function Title(props) {
  return <div className="title" />;
}

function Discussion(props) {
  return <div className="discussion" />;
}

function Comments(props) {
  const [showing, setShowing] = useState(true);
  const toggle = () => setShowing(!showing);

  return (
    <div className={`comments ${showing ? "" : "minimized"}`}>
      <div className="comment-header">
        <div className={`button ${showing ? "rotate" : ""}`} onClick={toggle}>
          <GoChevronLeft />
        </div>
        <div className={`title ${showing ? "" : "fade"}`}>Comments</div>
      </div>
      {props.comments.map(comment => (
        <Comment key={`${comment.contributor}/${comment.time_of_comment}`} _showing={showing} {...comment} />
      ))}
    </div>
  );
}

function Comment(props) {
  const { time_of_comment, contributor, body, _showing } = props;
  return (
    <div className={`comment ${_showing ? "" : "fade"}`}>
      <div>
        <span className="contributor" style={{ color: randomColor() }}>{contributor}</span>: {body}
      </div>
      <div className="time-of-comment">{time_of_comment}</div>
    </div>
  );
}

export default Conversation;
