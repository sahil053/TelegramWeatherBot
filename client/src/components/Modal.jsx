import { useState, useRef } from "react";
import axios from 'axios';

export default function Modal({ user, setUser }) {
  const [newUser, setNewUser] = useState(user)
  const cusRef = useRef(null)

  const handleDeleteUser = () => {
    axios.delete(`${import.meta.env.VITE_APP_ENDPOINT}/mongodb/deleteUser/${user.uid}`, newUser, { crossdomain: true }).then(() => {
      setUser(null)
    }).catch((err) => console.log(err))
  }

  const handleUpdateUser = () => {
    if (newUser.subscribed && !newUser.city) {
      alert("You need to specify a city for the user to subscribe to, or uncheck subscription!")
      cusRef.current.focus()
      return
    }

    axios.patch(`${import.meta.env.VITE_APP_ENDPOINT}/mongodb/updateUser/${user.uid}`, newUser, { crossdomain: true }).then(() => {
      setUser(null)
    }).catch((err) => console.log(err))
  }

  return (
    <>
      <div className="flex justify-center items-center mx-3 fixed inset-0 z-50 text-black">
        <div className="relative w-96 my-6 rounded-lg bg-white">
          <div className="flex justify-between p-5 border-b border-slate-200">
            <h3 className="text-base md:text-2xl font-semibold">Edit User</h3>
            <button className="hover:opacity-75" title="Close" type="button" onClick={() => setUser(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col justify-center m-6 gap-5 text-lg">
            <label className="flex gap-3">
              <p className="w-14">UID: </p>
              <input className="w-4/5 focus:outline-none border-2 rounded-lg px-2 bg-gray-200 cursor-not-allowed" value={newUser.uid} disabled={true} />
            </label>
            <label className="flex gap-3">
              <p className="w-14">Name: </p>
              <input className="w-4/5 focus:outline-none border-2 rounded-lg px-2" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser(user => ({ ...user, name: e.target.value }))} />
            </label>
            <label className="flex gap-3">
              <p className="w-14">City: </p>
              <input className="w-4/5 focus:outline-none border-2 rounded-lg px-2" ref={cusRef} placeholder="City" value={newUser.city} onChange={(e) => setNewUser(user => ({ ...user, city: e.target.value }))} />
            </label>
            <div className="flex justify-between">
              <label className="flex gap-3">
                <p>Subscribed: </p>
                <input type="checkbox" className="w-5 cursor-pointer" checked={newUser.subscribed} onChange={(e) => setNewUser(user => ({ ...user, subscribed: e.target.checked }))} />
              </label>
              <label className="flex gap-3">
                <p>Blocked: </p>
                <input type="checkbox" className="w-5 cursor-pointer" checked={newUser.blocked} onChange={(e) => setNewUser(user => ({ ...user, blocked: e.target.checked }))} />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
            <button type="button" className="px-4 py-2 rounded-lg bg-red-400 hover:opacity-75" onClick={handleDeleteUser}>Delete</button>
            <button type="button" className="px-4 py-2 rounded-lg bg-blue-400 hover:opacity-75" onClick={() => setUser(null)}>Cancel</button>
            <button type="button" className="px-4 py-2 rounded-lg bg-green-400 hover:opacity-75" onClick={handleUpdateUser}>Save</button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}