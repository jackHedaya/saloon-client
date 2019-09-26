import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

import ConfiguredQuill from "../components/ConfiguredQuill";
import ConfiguredInterweave from "../components/ConfiguredInterweave";

import useConversation from "../hooks/useConversation";
import useAuth from "../hooks/useAuth";

import * as conversationService from "../services/conversation.service";

import { randomColor } from "../_helpers";

import "./styles/Conversation.scss";

function Conversation(props) {
  const id = props.match.params.id;

  const [reload, setReload] = useState(1);
  const toggleReload = () => setReload(-reload);

  const { token, isLoggedIn } = useAuth;
  const [post, setPost] = useState("");
  const data = useConversation(id, { reload, token });

  const postAction = () => {
    conversationService
      .postConversationPost(token, { convo_id: id, post })
      .then(() => {
        toggleReload();
        setPost("");
      })
      .catch(_ => {}); // Handle erroring later
  };

  return (
    <div className="conversation">
      <Discussion
        posts={data.posts}
        submit={postAction}
        body={post}
        setBody={setPost}
        isLoggedIn={isLoggedIn}
        isContributor={data.isContributor}
      />
      <Title
        title={data.title}
        views={data.views}
        likes={data.votes}
        isLoggedIn={isLoggedIn}
        isContributor={data.isContributor}
        navigate={props.history.push}
        id={id}
      />
      <Comments comments={data.comments || []} />
    </div>
  );
}

function Title(props) {
  const { title, views, likes, isLoggedIn, isContributor, navigate, id } = props;

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
        {(!isLoggedIn || !isContributor) && (
          <div
            className="join"
            onClick={() =>
              isContributor
                ? false // Handle contributor request
                : navigate({ pathname: "/login", state: { from: { pathname: `/conversation/${id}` } } })
            }
          >
            Join Conversation
          </div>
        )}
      </div>
      <div className="views">{views} views</div>
    </div>
  );
}

function TitleVote(props) {
  const { likes = "0", vote, setVote } = props;

  return (
    <div className="vote">
      <FiThumbsUp className={`thumb ${vote === "UP" ? "upvoted" : ""}`} onClick={() => setVote("UP")} />
      <span className="amount">{likes}</span>
      <FiThumbsDown className={`thumb ${vote === "DOWN" ? "upvoted" : ""}`} onClick={() => setVote("DOWN")} />
    </div>
  );
}

function Discussion(props) {
  const { posts, body, setBody, submit, isLoggedIn, isContributor } = props;

  return (
    <div className="discussion">
      <div className="inner">
        {posts &&
          posts.map((item, index) => (
            <DiscussionItem {...item} key={`${item.contributor}/${item.time_of_post}/${index}`} />
          ))}
      </div>
      {isLoggedIn && isContributor && (
        <div className="editor-wrapper">
          <ConfiguredQuill value={body} setValue={setBody} />
          <div className="post-button" onClick={submit}>
            Submit
          </div>
        </div>
      )}
    </div>
  );
}

function DiscussionItem(props) {
  const { contributor, post } = props;

  return (
    <>
      <div className="item">
        <span style={{ color: randomColor(contributor) }}>{contributor}: </span>
        <ConfiguredInterweave content={post} />
      </div>
      <div className="break" />
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
