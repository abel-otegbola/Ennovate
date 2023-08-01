import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Dashboard from './pages/dashboard'

function App() {

  return (
    <BrowserRouter>
      <div className='bg-slate-100 dark:bg-[#101014]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
