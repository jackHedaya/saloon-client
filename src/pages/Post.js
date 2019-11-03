import React, { useState } from 'react'
import { Spinner } from 'reactstrap'

import ConfiguredQuill from '../components/ConfiguredQuill'
import Contributors from '../components/Contributors'

import * as conversationService from '../services/conversation.service'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'

import './styles/Post.scss'
import 'react-quill/dist/quill.snow.css'

export default function Post(props) {
  const { token } = useAuth()
  const user = useUser()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [invited, setInvited] = useState([])
  const addInvited = newUser =>
    !invited.includes(newUser) &&
    newUser.toLowerCase() !== user.username.toLowerCase() &&
    newUser.trim() !== ''
      ? setInvited([...invited, newUser])
      : null

  const [submitting, setSubmitting] = useState(false)

  function uploadPost() {
    setSubmitting(true)

    conversationService
      .postConversation(token, { title, body })
      .then(data => {
        setSubmitting(false)
        props.history.push(`/conversation/${data.convo_id}`)
      })
      .catch(_ => {
        setSubmitting(false)
      })
  }

  return (
    <div className="post">
      <Editor title={title} setTitle={setTitle} body={body} setBody={setBody} />
      <div className="">
        <Contributors
          sections={['invited']}
          onInvite={addInvited}
          invited={invited}
        >
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
        </Contributors>
      </div>
    </div>
  )
}

function Editor(props) {
  const { title, setTitle, body, setBody } = props

  return (
    <div className="editor">
      <input
        className="post-title"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <ConfiguredQuill value={body} onChange={val => setBody(val)} />
    </div>
  )
}
