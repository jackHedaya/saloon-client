import { useState, useEffect } from 'react'

import * as conversationService from '../services/conversation.service'

import useAuth from './useAuth'

export default function useFeed() {
    const {
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        didPersistLoad,
    } = useAuth()
    const [feed, setFeed] = useState(null)

    useEffect(() => {
        if (feed || !didPersistLoad) return

        const logout = () => {
            setToken(null)
            setIsLoggedIn(false)
            setFeed(null)
        }

        conversationService
            .getFeed(token)
            .then(u => setFeed(u.convos))
            .catch(_ => logout())
    }, [token, feed, setToken, isLoggedIn, setIsLoggedIn, didPersistLoad])

    return feed
}
