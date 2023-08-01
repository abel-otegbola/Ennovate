import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Dashboard from './pages/dashboard'
import Settings from './pages/settings/settings'
import Topbar from './components/topbar/topbar'

function App() {

  return (
    <BrowserRouter>
      <div className='bg-slate-100 dark:bg-[#101014] text-black dark:text-white'>
        <Topbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/settings' element={<Settings />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
