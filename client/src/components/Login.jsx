import { useContext } from "react"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import StyledFirebaseAuth from './StyledFirebaseAuth'
import { AuthContext } from "../contexts/AuthContext"

export default function Login() {
  const { auth } = useContext(AuthContext)
  
  const uiConfig = {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: `/#/panel`,
    tosUrl: '/',
    privacyPolicyUrl: '/'
  }

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="flex items-center flex-col text-white w-96 h-96 m-5 bg-gradient-to-br to-black rounded-3xl from-gray-700">
        <p className="pt-10">Sign in using one of the methods below!</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} className="flex-1 flex justify-center items-center" />
      </div>
    </div>
  )
}