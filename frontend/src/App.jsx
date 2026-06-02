import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Checklist from './pages/Checklist.jsx'
import DontForget from './pages/DontForget.jsx'
import Structure from './pages/Structure.jsx'
import Summary from './pages/Summary.jsx'

export default function App() {
  return (
    <Routes>
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
