import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Dashboard from './pages/dashboard'
import Settings from './pages/settings/settings'
import Topbar from './components/topbar/topbar'
import { useEffect } from 'react'
import Footer from './components/footer/footer'
import Login from './pages/login/login'
import FinishSignup from './pages/finishSignup/finishSignup'
import { AuthProvider } from './customHooks/useAuth'

function App() {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    } else {
    document.documentElement.classList.remove('dark')
    }
  })

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='bg-slate-100 dark:bg-[#101014] text-black dark:text-white text-[12px]'>
          <Topbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login />} />
            <Route path={"/finishSignup"} element={<FinishSignup />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
