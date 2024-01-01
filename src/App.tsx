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
import Project from './pages/project/project'
import TermsConditions from './pages/t&c/t&c'
import PrivacyPolicy from './pages/privacypolicy/privacypolicy'
import Explore from './pages/explore/explore'
import Search from './pages/search/search'
import ErrorPage from './pages/404/404'

function App() {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    } else {
    document.documentElement.classList.remove('dark')
    }
  })

  const fontSize = localStorage.getItem("size")

  let font = fontSize ? JSON.parse(fontSize.replace(/&quot;/g, '"')) : "14px"

  useEffect(() => {
    console.log(font)
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={`bg-white dark:bg-black w-full min-h-full text-black dark:text-white/[0.8] leading-[30px]`} style={{ fontSize: font }}>
          <Topbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/project' element={<Project />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/search' element={<Search />} />
            <Route path='/terms&Conditions' element={<TermsConditions />} />
            <Route path='/privacypolicy' element={<PrivacyPolicy />} />
            <Route path={"/finishSignup"} element={<FinishSignup />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
