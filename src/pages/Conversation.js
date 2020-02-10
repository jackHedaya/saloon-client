import React, { useState } from 'react'
import { GoCommentDiscussion, GoOrganization } from 'react-icons/go'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'

import Sidebar from '../components/Sidebar'
import ConfiguredQuill from '../components/ConfiguredQuill'
import ConfiguredInterweave from '../components/ConfiguredInterweave'
import Contributors from '../components/Contributors'

import useConversation from '../hooks/useConversation'
import useComments from '../hooks/useComments'
import useAuth from '../hooks/useAuth'
import useReload from '../hooks/useReload'

import * as conversationService from '../services/conversation.service'
import * as commentService from '../services/comment.service'

import { randomColor } from '../_helpers'

import './styles/Conversation.scss'

function Conversation(props) {
  const id = props.match.params.id
  const { token, isLoggedIn } = useAuth()

  const [convoReload, reloadConvo] = useReload()
  const [commentReload, reloadComments] = useReload()

  const convo = useConversation(id, { reload: convoReload, token })
  const comments = useComments(id, { reload: commentReload, token })

  const [post, setPost] = useState('')
  const [invited, setInvited] = useState(convo.contributors || [])

  const inviteContributor = newUser => {
    setInvited([...invited, newUser])

    conversationService
      .postContributor(newUser, { token, convo_id: id })
      .then(_ => reloadConvo())
      .catch(_ => {}) // Handle erroring later
  }

  const postConvoPost = () => {
    conversationService
      .postConversationPost(token, { convo_id: id, post })
      .then(() => {
        reloadConvo()
        setPost('')
      })
      .catch(_ => {}) // Handle erroring later
  }

  function postComment(comment) {
    return commentService
      .postComment(token, { convo_id: id, comment })
      .then(() => reloadComments())
      .catch(_ => {}) // Handle erroring later
  }

  /**
   *
   * @param {'1' | '0' | '-1'} vote
   */
  const updateVote = vote => {
    conversationService
      .putVote(id, { token, vote })
      .then(() => reloadConvo())
      .catch(_ => {}) // Handle erroring later
  }

  return (
    <div className="conversation">
      <Discussion
        posts={convo.posts}
        submit={postConvoPost}
        body={post}
        setBody={setPost}
        isLoggedIn={isLoggedIn}
        isContributor={convo.isContributor}
      />
      <Title
        title={convo.title}
        views={convo.views}
        votes={convo.votes}
        userVote={convo.vote}
        updateVote={updateVote}
        isLoggedIn={isLoggedIn}
        isContributor={convo.isContributor}
        navigate={props.history.push}
        id={id}
      />
      <Sidebar>
        <Comments
          icon={GoCommentDiscussion}
          title="Comments"
          comments={comments || []}
          postComment={postComment}
        />
        <Contributors
          icon={GoOrganization}
          title="Contributors"
          style={{ width: '100px', transition: 'all 0.5s ease-in' }}
          sections={['active', 'invited']}
          invited={invited}
          active={convo.contributors}
          onInvite={inviteContributor}
          noTitle
        />
      </Sidebar>
    </div>
  )
}

function Title(props) {
  const {
    title,
    views,
    votes,
    userVote,
    updateVote,
    isLoggedIn,
    isContributor,
    navigate,
    id,
  } = props

  const handleVote = nVote => {
    if (nVote === userVote) updateVote(0)
    else updateVote(nVote)
  }

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
                : navigate({
                    pathname: '/login',
                    state: {
                      from: {
                        pathname: `/conversation/${id}`,
                      },
                    },
                  })
            }
          >
            Join Conversation
          </div>
        )}
      </div>
      <div className="views">{views} views</div>
    </div>
  )
}

function TitleVote(props) {
  const { votes = '0', userVote, setVote } = props

  return (
    <div className="vote">
      <FiThumbsUp
        className={`thumb ${userVote === 1 ? 'upvoted' : ''}`}
        onClick={() => setVote(1)}
      />
      <span className="amount">{votes}</span>
      <FiThumbsDown
        className={`thumb ${userVote === -1 ? 'upvoted' : ''}`}
        onClick={() => setVote(-1)}
      />
    </div>
  )
}

function Discussion(props) {
  const { posts, body, setBody, submit, isLoggedIn, isContributor } = props

  return (
    <div className="discussion">
      <div className="inner">
        {posts &&
          posts.map((item, index) => (
            <DiscussionItem
              {...item}
              key={`${item.contributor}/${item.time_of_post}/${index}`}
            />
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
  )
}

function DiscussionItem(props) {
  const { contributor, post } = props

  return (
    <>
      <div className="item">
        <span style={{ color: randomColor(contributor) }}>{contributor}: </span>
        <ConfiguredInterweave content={post} />
      </div>
      <div className="break" />
    </>
  )
}

function Comments(props) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function postComment() {
    if (isSubmitting) return
    setIsSubmitting(true)

    props.postComment(newComment).then(_ => {
      setIsSubmitting(false)
      setNewComment('')
    })
  }

  return (
    <>
      {props.comments.map((comment, index) => (
        <Comment
          key={`${comment.contributor}/${comment.time_of_comment}/${index}`}
          {...comment}
        />
      ))}
      <div className="add">
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.currentTarget.value)}
        />
        <button type="submit" onClick={postComment}>
          {!isSubmitting ? 'Submit' : 'Posting'}
        </button>
      </div>
    </>
  )
}

function Comment(props) {
  const { comment_at, username, comment, votes } = props
  const [upvoted, setUpvoted] = useState(false)

  return (
    <div className="comment">
      <div className="meta">
        <div className="contributor" style={{ color: randomColor(username) }}>
          {username}
        </div>
        <div
          className={`likes ${upvoted ? 'upvoted' : ''}`}
          onClick={() => setUpvoted(!upvoted)}
        >
          {upvoted ? votes + 1 : votes}{' '}
          <FiThumbsUp style={{ fontSize: '12px' }} />
        </div>
        <div className="time">{'9 hours ago'}</div>{' '}
        {/* TODO: update when API supports */}
      </div>
      <div className="body">{comment}</div>
    </div>
  )
}

export default Conversation
