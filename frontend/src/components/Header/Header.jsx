import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import './Header.css';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="header">
        <NavLink to="/" className="logo">Taller Mecánico</NavLink>
        <nav className="nav">
          <button onClick={() => setShowLogin(true)} className="nav-link">Login</button>
          <button onClick={() => setShowRegister(true)} className="nav-link">Register</button>
        </nav>
      </header>

      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <Login onClose={() => setShowLogin(false)} />
      </Modal>

      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
        <Register onClose={() => setShowRegister(false)} />
      </Modal>
    </>
  );
}

export default Header;
