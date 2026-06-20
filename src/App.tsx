import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { PolMar } from './pages/PolMar'
import { MAGNet } from './pages/MAGNet'
import { GaussianVicinalLoss } from './pages/GaussianVicinalLoss'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/polmar" element={<PolMar />} />
          <Route path="/magnet" element={<MAGNet />} />
          <Route path="/gvl" element={<GaussianVicinalLoss />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
