import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route } from "react-router-dom";

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClienteDashboard from './pages/cliente/ClienteDashboard';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas según rol */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cliente" element={<ClienteDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
