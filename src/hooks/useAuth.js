import { useContext } from 'react'
import { AuthContext } from '../App'

export default function useAuth() {
  return useContext(AuthContext)
}
