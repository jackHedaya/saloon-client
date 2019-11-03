import React, { useState } from "react";
import { GoCommentDiscussion, GoOrganization } from "react-icons/go";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import ConfiguredQuill from "../components/ConfiguredQuill";
import ConfiguredInterweave from "../components/ConfiguredInterweave";
import Contributors from "../components/Contributors";

import useConversation from "../hooks/useConversation";
import useAuth from "../hooks/useAuth";

import * as conversationService from "../services/conversation.service";

import { randomColor } from "../_helpers";

import "./styles/Conversation.scss";

function Conversation(props) {
  const id = props.match.params.id;

  const [reload, setReload] = useState(1);
  const toggleReload = () => setReload(-reload);

  const { token, isLoggedIn } = useAuth();
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

  /**
   *
   * @param {'1' | '0' | '-1'} vote
   */
  const updateVote = vote => {
    conversationService
      .putVote(id, { token, vote })
      .then(() => toggleReload())
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
        votes={data.votes}
        userVote={data.vote}
        updateVote={updateVote}
        isLoggedIn={isLoggedIn}
        isContributor={data.isContributor}
        navigate={props.history.push}
        id={id}
      />
      <Sidebar>
        <Comments icon={GoCommentDiscussion} title="Comments" comments={data.comments || []} />
        <Contributors
          icon={GoOrganization}
          title="Contributors"
          style={{ width: "100px", transition: "width 0.5s ease-in" }}
          noTitle
        />
      </Sidebar>
      {/* <Comments comments={data.comments || []} /> */}
    </div>
  );
}

function Title(props) {
  const { title, views, votes, userVote, updateVote, isLoggedIn, isContributor, navigate, id } = props;

  const handleVote = nVote => {
    if (nVote === userVote) updateVote(0);
    else updateVote(nVote);
  };

  return (
    <div className="d-title">
      <TitleVote votes={votes} userVote={userVote} setVote={handleVote} />
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
  const { votes = "0", userVote, setVote } = props;

  return (
    <div className="vote">
      <FiThumbsUp className={`thumb ${userVote === 1 ? "upvoted" : ""}`} onClick={() => setVote(1)} />
      <span className="amount">{votes}</span>
      <FiThumbsDown className={`thumb ${userVote === -1 ? "upvoted" : ""}`} onClick={() => setVote(-1)} />
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
  return (
    <>
      {props.comments.map((comment, index) => (
        <Comment key={`${comment.contributor}/${comment.time_of_comment}/${index}`} {...comment} />
      ))}
      <div className="add">
        <textarea />
        <button type="submit">Submit</button>
      </div>
    </>
  );
}

function Comment(props) {
  const { time_of_comment, contributor, body, likes } = props;
  const [upvoted, setUpvoted] = useState(false);

  return (
    <div className="comment">
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
