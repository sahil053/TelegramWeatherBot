import { Link } from 'react-router-dom'
import GridIcon from '../assets/grid.jpg'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Welcome() {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center text-text flex-1 mx-12 gap-6">
      <div className='lg:w-1/3 flex flex-col gap-10 items-center lg:items-start'>
        <p className="font-semibold leading-snug tracking-wider text-xl sm:text-4xl text-center lg:text-left">
          Admin Panel to control NAHH Weather telegram bot remotely!
        </p>
        <Link to={user ? '/panel' : 'login'} className='w-fit px-8 py-3 rounded-lg text-text bg-gradient-to-tr from-accent to-primaryColor hover:opacity-90'>{user ? "Panel" : "Sign In"}</Link>
      </div>
      <img className="rounded-lg min-w-[360px] w-11/12 lg:w-1/2 max-w-lg" src={GridIcon} alt="Sample" />
    </div>
  )
}
