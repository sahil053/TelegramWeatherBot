import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Welcome from './components/Welcome'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <HashRouter>
      <AuthProvider>
        <div className='min-h-screen flex flex-col bg-background'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={ <Welcome /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/panel' element={ <AdminPanel /> } />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </HashRouter>
  )
}

export default App