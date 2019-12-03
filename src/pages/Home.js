import React from 'react'

import RowFeed from '../components/RowFeed'

import useFeed from '../hooks/useFeed'

function Home() {
  const feed = useFeed()

  return (
    <div className="home">
      <RowFeed items={feed} />
    </div>
  )
}

export default Home
