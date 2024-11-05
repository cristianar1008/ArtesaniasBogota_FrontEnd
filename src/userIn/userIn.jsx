import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './userIn.css';

function UserIn() {
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
    <div className="user-in-container-user-In">
      <div className="icon-wrapper-user-In" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
        {isMenuOpen && (
          <div className="dropdown-menu-user-In">
            <div className="menu-item-user-In" onClick={openModal}>Iniciar sesión</div>
            <div className="menu-item-user-In">Registrarse</div>
          </div>
        )}
      </div>

      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faShoppingCart} className="icon-spacing-user-In" />
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <input type="email" placeholder="Correo" />
            <input type="password" placeholder="Contraseña" />
            <button>Iniciar Sesión</button>
            <div className="forgot-password">
              <a href="#">¿Olvidó su contraseña?</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserIn;

