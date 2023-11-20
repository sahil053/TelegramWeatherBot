import { useContext, useState } from 'react'
import NavIcon from '../assets/weather.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, auth } = useContext(AuthContext)
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="flex justify-between items-center py-6 px-8">
      <Link to='/' className='flex text-text gap-4 items-center text-lg hover:opacity-75'>
        <img src={NavIcon} alt='Nav Icon' />NAHH Weather
      </Link>
      <div className="relative inline-block">     
        <button type="button" onClick={() => setToggle(!toggle)} className="inline-flex mt-1" title="Account">
          {!user || !user.photoURL ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" color='white' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg> :
            <img className="rounded-full h-12" src={user.photoURL} alt="profile" />
          }
        </button>
        {toggle ?
          <div className="text-gray-700 absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            {user ?
              <>
                <div className="pt-4">
                  <p className="block px-4 text-sm">Signed in as:</p>
                  <div className="block px-4 py-2 text-sm">
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                  </div>
                  <Link to="/panel" className="block px-4 py-3 border-t border-gray-200 text-sm hover:bg-accent hover:text-white" onClick={() => {
                    setToggle(false)
                  }}>
                    Admin Panel
                  </Link>
                </div>
                <Link to='/' className="w-full block px-4 py-3 text-left text-sm border-t border-gray-200 hover:bg-accent hover:text-white" onClick={() => {
                  auth.signOut()
                  setToggle(false)
                }}>
                  Sign Out
                </Link>
              </> :
              <Link to="/login" className="block px-4 py-3 text-sm hover:bg-accent hover:text-white" onClick={() => setToggle(false)}>Sign In</Link>
            }
          </div> : null
        }
      </div>
    </nav>
  )
}
