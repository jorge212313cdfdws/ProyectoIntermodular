import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import MecanicoDashboard from './pages/mecanico/MecanicoDashboard'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cliente" element={<ClienteDashboard />} />
          <Route path="/mecanico" element={<MecanicoDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
