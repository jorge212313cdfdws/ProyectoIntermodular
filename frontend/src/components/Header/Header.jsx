import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import './Header.css';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar si hay usuario logueado cada vez que cambia la ubicación
    const checkUser = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setCurrentUser(parsedUser);
        } catch (error) {
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkUser();
  }, [location]); // Se ejecuta cada vez que cambia la URL

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    setCurrentUser(null);
    navigate('/');
  };

  const handleLoginSuccess = () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('Usuario logueado:', parsedUser);
      setCurrentUser(parsedUser);
    }
    setShowLogin(false);
    window.dispatchEvent(new Event('user-login'));
  };

  return (
    <>
      <header className="header">
        <NavLink to="/" className="logo">Taller Mecánico</NavLink>
        <nav className="nav">
          {!currentUser ? (
            <>
              <button onClick={() => setShowLogin(true)} className="nav-link">Login</button>
              <button onClick={() => setShowRegister(true)} className="nav-link">Register</button>
            </>
          ) : (
            <>
              {currentUser.role === 'admin' && (
                <NavLink to="/admin" className="nav-link">Operaciones</NavLink>
              )}
              {currentUser.role === 'mecanico' && (
                <NavLink to="/mecanico" className="nav-link">Panel Mecánico</NavLink>
              )}
              {currentUser.role === 'cliente' && (
                <NavLink to="/cliente" className="nav-link">Mi Perfil</NavLink>
              )}
              <button onClick={handleLogout} className="nav-link logout-btn">
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </header>

      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <Login onClose={handleLoginSuccess} />
      </Modal>

      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
        <Register onClose={() => setShowRegister(false)} />
      </Modal>
    </>
  );
}

export default Header;
