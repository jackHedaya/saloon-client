import { useState, useEffect } from 'react'

import useAuth from './useAuth'

import * as conversationService from '../services/conversation.service'

export default function useConversation(id, { reload, token }) {
    const [conversation, setConvo] = useState({})
    const { didPersistLoad } = useAuth()

    useEffect(() => {
        if (!didPersistLoad) return

        conversationService
            .getConversation(id, { token })
            .then(u => setConvo(u))
            .catch(_ => {})
    }, [id, reload, token, didPersistLoad])

    return conversation
}
