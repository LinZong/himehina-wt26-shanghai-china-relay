import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UtamitaSaiGreet from './pages/UtamitaSaiGreet'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/greet/utamita-sai" element={<UtamitaSaiGreet />} />
    </Routes>
  )
}
