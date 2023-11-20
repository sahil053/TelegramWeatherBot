import { useEffect, useState } from "react"
import ConnectionIcon from '../assets/connection.svg'
import Modal from './Modal'
import axios from 'axios'
import Connection from "./Connection"

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(false)
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_ENDPOINT}/mongodb/allUsers`, { crossdomain: true }).then(res => {
      setUsers(res.data)
    }).catch(err => console.log(err))
  }, [user])

  return (
    <div className='flex flex-1 m-3 md:m-8 text-text flex-col'>
      <div className="py-4 flex justify-between items-center gap-4 text-2xl">
        &emsp;
        <h1>Admin Panel</h1>
        <button type="button" title="Add an API Key" onClick={() => setToggle(true)}>
          <img className="bg-text" src={ConnectionIcon} alt="Connection Icon" />
        </button>
      </div>
      <table className="table-auto text-center m-2 border-separate border-spacing-7">
        <thead>
          <tr className="text-lg">
            <th>User ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Subscribed</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {users.map( user => {
            return (
              <tr key={user._id}>
                <td>{user.uid}</td>
                <td>{user.name}</td>
                <td>{user.city || "N/A" }</td>
                <td>{user.subscribed ? "True" :  "False"}</td>
                <td>{user.blocked ? "True" : "False"}</td>
                <td><button className="rounded-lg bg-gradient-to-tr from-primaryColor to-accent px-5 text-base py-2 hover:opacity-75" onClick={() => setUser(user)}>Edit</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {user ? <Modal user={user} setUser={setUser} /> : null}
      {toggle ? <Connection toggle={toggle} setToggle={setToggle} /> : null}
    </div>
  )
}
