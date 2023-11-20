import axios from 'axios';
import { useState } from 'react';

export default function Connection({ toggle, setToggle }) {
  const [newApi, setNewApi] = useState({ default: true, key: "" })
  const [isValid, setIsValid] = useState(false)
  const ogApi = "*****************************************SZrHk"
  
  const checkValidity = () => {
    if (newApi.default) {
      axios.get(`${import.meta.env.VITE_APP_ENDPOINT}/isValid`, { crossdomain: true }).then(res => {
        alert(`Code: ${res.data.status}` + " " + res.data.message)
      }).catch(err => console.log(err))
    } else {
      axios.get(`https://api.telegram.org/bot${newApi.key}/getMe`, { crossdomain: true }).then(res => {
        setIsValid(true)
        alert("API Key is valid!")
      }).catch(err => alert(err.message))
    }
  }

  const handleApiKey = () => {
    axios.post(`${import.meta.env.VITE_APP_ENDPOINT}/api/addApiKey/${newApi.key}`, { crossdomain: true }).then(res => {
      alert(res.data.message)
      setToggle(false)
    }).catch(err => console.log(err))
  }

  return (
    <>
      <div className="flex justify-center items-center mx-3 fixed inset-0 z-50 text-black">
        <div className="relative w-96 my-6 rounded-lg bg-white">
          <div className="flex justify-between p-5 border-b border-slate-200">
            <h3 className="text-base md:text-xl font-semibold">Edit API Settings</h3>
            <button className="hover:opacity-75" title="Close" type="button" onClick={() => setToggle(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col justify-center m-6 gap-5 text-lg">
            <label className="gap-3">
              <p className="mb-2">API Key: </p>
              <input className={`${newApi.default ? 'bg-gray-200 cursor-not-allowed' : ''} w-full text-base py-1 focus:outline-none border-2 rounded-lg px-2`} value={newApi.default ? ogApi : newApi.key} onChange={(e) => {
                setNewApi(api => ({ ...api, key: e.target.value }))
                setIsValid(false)
              }} disabled={newApi.default} />
            </label>
            <label className="flex gap-3 w-fit">
              <p>Use default: </p>
              <input type="checkbox" className="w-5 cursor-pointer" checked={newApi.default} onChange={(e) => setNewApi(api => ({...api, default: e.target.checked}))} />
            </label>
          </div>
          <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
            <button type="button" className="px-4 py-2 rounded-lg bg-red-400 hover:opacity-75" onClick={() => setToggle(false)}>Cancel</button>
            <button type="button" className="px-4 py-2 rounded-lg bg-blue-400 hover:opacity-75" onClick={checkValidity}>Validate</button>
            <button type="button" className={`${!isValid ? 'bg-gray-200 cursor-not-allowed' : ' bg-green-400'} px-4 py-2 rounded-lg hover:opacity-75`} onClick={handleApiKey} disabled={!isValid}>Save</button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
