import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Checklist from './pages/Checklist.jsx'
import DontForget from './pages/DontForget.jsx'
import Structure from './pages/Structure.jsx'
import Summary from './pages/Summary.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="checklist" element={<Checklist />} />
        <Route path="dont-forget" element={<DontForget />} />
        <Route path="structure" element={<Structure />} />
        <Route path="summary" element={<Summary />} />
      </Route>
    </Routes>
  )
}
