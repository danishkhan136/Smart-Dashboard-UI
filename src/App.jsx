import { Routes, Route, Navigate } from 'react-router-dom'
import LoginSignup from './LoginSignup'
import NavyDashboard from './NavyDashboard'

function App() {
  return (
    <Routes>
      <Route path="/"           element={<LoginSignup />} />
      <Route path="/dashboard"  element={<NavyDashboard />} />
      <Route path="*"           element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
