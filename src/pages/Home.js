import React from 'react'

import CardRow from '../components/CardRow'

import useFeed from '../hooks/useFeed'
import { useWindowWidth } from '@react-hook/window-size'

import chunk from 'lodash.chunk'

function Home() {
  const feed = useFeed()
  const width = useWindowWidth()

  const splitFeed = chunk(feed, width < 925 ? 1 : width < 1260 ? 2 : 3)

  return (
    <div className="column-page">
      {splitFeed.map((cards, i) => (
        <CardRow cards={cards} key={`CardRow/${i}`} />
      ))}
    </div>
  )
}

export default Home
