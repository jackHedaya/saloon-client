import { useState, useEffect } from 'react'

import * as userService from '../services/user.service'

import useAuth from './useAuth'

export function useUser({ reload } = {}) {
  const { token, setToken, isLoggedIn, setIsLoggedIn } = useAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token || !isLoggedIn) return

    const logout = () => {
      setToken(null)
      setIsLoggedIn(false)
      setUser(null)
    }

    userService
      .getUser(token)
      .then((u) => setUser(u))
      .catch((_) => logout())
  }, [token, setToken, isLoggedIn, setIsLoggedIn, reload])

  return user
}

export function useLiked({ reload } = {}) {
  const { token, isLoggedIn } = useAuth()
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    if (!token || !isLoggedIn) return

    userService
      .getLiked(token)
      .then((liked) => setLiked(liked))
      .catch((_) => setLiked(null))
  }, [token, isLoggedIn, reload])

  return liked
}

export function useProfile(id) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    userService
      .getProfile(id)
      .then((u) => setProfile(u))
      .catch((_) => setProfile(null))
  })

  return profile
}
