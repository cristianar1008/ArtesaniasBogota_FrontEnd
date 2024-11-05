import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './register.css';

function Register() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header-container">
      <div className="logo-and-search">
        <div className="logo">Artesanías Bogotá Ltda.</div>
        <input type="text" className="search-bar" placeholder="Buscar..." />
      </div>
      <div className="icons">
        <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleMenu} />
        <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className="menu-item">Iniciar sesión</div>
            <div className="menu-item" onClick={openModal}>Registrarse</div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Formulario de Registro de Usuarios</h2>
            <form>
              <input type="text" placeholder="Número de documento de identidad" required />
              <input type="text" placeholder="Primer nombre" required />
              <input type="text" placeholder="Segundo nombre" />
              <input type="text" placeholder="Primer apellido" required />
              <input type="text" placeholder="Segundo apellido" />
              <input type="text" placeholder="Número de teléfono" required />
              <input type="text" placeholder="Dirección de residencia" required />
              <input type="email" placeholder="Correo electrónico" required />
              <button type="submit">Registrarse</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
