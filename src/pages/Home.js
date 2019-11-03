import React from 'react'

import Feed from '../components/Feed'

import useFeed from '../hooks/useFeed'

function Home() {
    const feed = useFeed()

    return (
        <div className="home">
            <Feed items={feed} />
        </div>
    )
}

export default Home
