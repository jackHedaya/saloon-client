import React from 'react'
import Avatar from 'react-avatar'

import useFeed from '../hooks/useFeed'
import { useHistory } from 'react-router-dom'

import chunk from 'lodash.chunk'
import useWindowSize from '@react-hook/window-size'

import './styles/Home.scss'

function Home() {
  const feed = useFeed()

  const [width] = useWindowSize()

  const splitFeed = chunk(feed, width < 925 ? 1 : width < 1260 ? 2 : 3)

  return (
    <div className="home">
      {splitFeed.map((cards, i) => (
        <CardRow cards={cards} key={`CardRow/${i}`} />
      ))}
    </div>
  )
}

function CardRow(props) {
  return (
    <div className="card-row">
      {props.cards?.length > 1 ? <div className="connector" /> : null}
      {props.cards.map(card => (
        <Card {...card} key={`CardRow/${card.convo_id}`} />
      ))}
    </div>
  )
}

function Card(props) {
  const AVATAR_SIZE = 45

  const history = useHistory()
  const navigate = history.push

  return (
    <div
      className="home-card"
      onClick={() => navigate(`/conversation/${props.convo_id}`)}
    >
      <div className="title">{props.title}</div>
      <Avatar name={props.contributors?.[0]} round size={AVATAR_SIZE} />
      {props.contributors.length > 1 && (
        <Avatar name={props.contributors[1]} round size={AVATAR_SIZE} />
      )}
      <DiscussedBy contributors={props.contributors || []} />
      <div className="age">{props.age}</div>
      <div className="views">{props.views} Views</div>
    </div>
  )
}

function DiscussedBy({ contributors }) {
  const format = list => {
    if (list.length === 1) return list[0]
    else if (list.length === 2) return `${list[0]} and ${list[1]}`
    else if (list.length === 3) return `${list[0]}, ${list[1]} and ${list[2]}`
    else if (list.length === 4)
      return `${list[0]}, ${list[1]}, ${list[2]} and ${list[3]}`
  }

  return (
    <div className="discussed-by">Discussion by {format(contributors)}</div>
  )
}

export default Home
