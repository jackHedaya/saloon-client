import React from 'react'
import Avatar from 'react-avatar'
import { withRouter } from 'react-router-dom'

import ConfiguredInterweave from '../components/ConfiguredInterweave'

import { randomColor } from '../_helpers'

import './styles/Feed.scss'

function Feed(props) {
  const { items } = props

  var convo_ids = []

  return (
    <div className="feed">
      {(items || []).map(item => {
        if (convo_ids.includes(item.convo_id)) return false
        else {
          convo_ids.push(item.convo_id)
          return (
            <FeedItem
              {...item}
              key={`Feed/${item.convo_id}`}
              navigate={x => props.history.push(x)}
              description={item.post}
            />
          )
        }
      })}
    </div>
  )
}

function FeedItem(props) {
  return (
    <>
      <div
        className="item"
        onClick={() => props.navigate(`/conversation/${props.convo_id}`)}
      >
        <div className="title">{props.title}</div>
        <div className="inner">
          <Metadata {...props} />
          <div className="body">
            <ConfiguredInterweave content={props.description} />
          </div>
        </div>
      </div>
      <div className="break" />
    </>
  )
}

function Metadata(props) {
  const format = list => {
    if (list.length === 1) return list[0]
    else if (list.length === 2) return `${list[0]} and ${list[1]}`
    else if (list.length === 3) return `${list[0]}, ${list[1]} and ${list[2]}`
    else if (list.length === 4)
      return `${list[0]}, ${list[1]}, ${list[2]} and ${list[3]}`
  }

  return (
    <div className="meta">
      <PeopleInvolved
        people={props.contributors}
        description={format(props.contributors)}
      />
      <div className="creator">{props.creator}</div>
      <div className="convo-data">
        <div className="left">
          <div>edited {props.age}</div>
          <div>viewed {props.views} times</div>
        </div>
        <div className="right">
          <div>{props.votes} votes</div>
          <div>{props.comments} comments</div>
        </div>
      </div>
    </div>
  )
}

function PeopleInvolved(props) {
  return (
    <div className="discussed-by">
      <Avatar
        name={props.people[0]}
        color={randomColor(props.people[0])}
        round
        size={42}
      />
      {props.people.length > 1 && (
        <Avatar
          name={props.people[1]}
          color={randomColor(props.people[1])}
          round
          size={42}
        />
      )}
      <span className="text">
        <div>Discussion by {props.description}</div>
      </span>
    </div>
  )
}

export default withRouter(Feed)
