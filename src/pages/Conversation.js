import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import Interweave from "interweave";
import { UrlMatcher } from "interweave-autolink";

import ConfiguredQuill from "../components/ConfiguredQuill";

// import useAuth from "../hooks/useAuth";

import { randomColor } from "../_helpers";

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
        contributor: "Jack Hedaya",
        post: "I am a proud member of Medium and Quora, but I must say Saloon is just so much better!",
        time_of_post: "9 hours ago"
      },
      {
        contributor: "Jack Hedaya",
        post: "I am a proud member of Medium and Quora, but I must say Saloon is just so much better!",
        time_of_post: "9 hours ago"
      },
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
      {
        contributor: "Abraham Kassin",
        body: "Satan has a good point there",
        time_of_comment: "9 hours ago",
        likes: 99
      },
      { contributor: "Creepy Demon #4", body: "Go get 'em boss!", time_of_comment: "9 hours ago", likes: 3 }
    ]
  };
}

function Conversation(props) {
  const id = props.match.params;

  const data = FAKE_FETCH(id);

  return (
    <div className="conversation">
      <Discussion posts={data.posts} />
      <Title title={data.title} views={data.views} likes={data.votes} />
      <Comments comments={data.comments} />
    </div>
  );
}

function Title(props) {
  const { title, views, likes } = props;

  const [vote, setVote] = useState("NONE");
  const handleVote = nVote => {
    if (nVote === vote) setVote("NONE");
    else setVote(nVote);
  };

  return (
    <div className="d-title">
      <TitleVote likes={likes} vote={vote} setVote={handleVote} />
      <div>
        <div className="text">{title}</div>
        <div className="join">Join Conversation</div>
      </div>
      <div className="views">{views}</div>
    </div>
  );
}

function TitleVote(props) {
  const { likes = "0", vote, setVote } = props;

  return (
    <div className="vote">
      <FiThumbsUp className={`thumb ${vote === "UP" ? "upvoted" : ""}`} onClick={() => setVote("UP")} />
      <span className="amount">{likes.split(" ")[0]}</span>
      <FiThumbsDown className={`thumb ${vote === "DOWN" ? "upvoted" : ""}`} onClick={() => setVote("DOWN")} />
    </div>
  );
}

function Discussion(props) {
  const [body, setBody] = useState("");

  return (
    <div className="discussion">
      <div className="inner">
        {props.posts &&
          props.posts.map((item, index) => (
            <DiscussionItem {...item} key={`${item.contributor}/${item.time_of_post}/${index}`} />
          ))}
      </div>
      <div className="editor-wrapper">
        <ConfiguredQuill value={body} setValue={setBody} />
        <div className="post-button">Submit</div>
      </div>
    </div>
  );
}

function DiscussionItem(props) {
  const { contributor, post } = props;

  return (
    <>
      <div className="item">
        <span style={{ color: randomColor(contributor) }}>{contributor}: </span>
        <Interweave content={post} matchers={[new UrlMatcher("url")]} />
      </div>
      <div className="break"></div>
    </>
  );
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
      {props.comments.map((comment, index) => (
        <Comment key={`${comment.contributor}/${comment.time_of_comment}/${index}`} _showing={showing} {...comment} />
      ))}
      <div className={`add ${showing ? "" : "fade"}`}>
        <textarea />
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

function Comment(props) {
  const { time_of_comment, contributor, body, _showing, likes } = props;
  const [upvoted, setUpvoted] = useState(false);

  return (
    <div className={`comment ${_showing ? "" : "fade"}`}>
      <div className="meta">
        <div className="contributor" style={{ color: randomColor(contributor) }}>
          {contributor}
        </div>
        <div className={`likes ${upvoted ? "upvoted" : ""}`} onClick={() => setUpvoted(!upvoted)}>
          {upvoted ? likes + 1 : likes} <FiThumbsUp style={{ fontSize: "12px" }} />
        </div>
        <div className="time">{time_of_comment}</div>
      </div>
      <div className="body">{body}</div>
    </div>
  );
}

export default Conversation;
