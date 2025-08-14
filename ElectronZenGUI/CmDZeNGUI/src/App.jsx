import './index.css'
import MainLoginPage from '../pages/mainLoginPage'
import HomePage from '../pages/homePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<MainLoginPage />} /> */}
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App
