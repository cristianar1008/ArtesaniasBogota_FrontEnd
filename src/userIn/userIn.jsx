import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './userIn.css';

function UserIn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Nuevo estado para el carrito

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState); // Alterna el estado del carrito
    setIsMenuOpen(false); // Cierra el menú de usuario si está abierto
    setIsModalOpen(false); // Cierra el modal si está abierto
  };

  const closeCart = () => {
    setIsCartOpen(false); // Cierra la barra lateral
  };

  return (
    <div className="user-in-container-user-In">
      <div className="icon-wrapper-user-In" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
        <span className="icon-label">Mi cuenta</span>
        {isMenuOpen && (
          <div className="dropdown-menu-user-In">
            <div className="menu-item-user-In" onClick={openModal}>Iniciar sesión</div>
            <div className="menu-item-user-In">Registrarse</div>
          </div>
        )}
      </div>

      <div className="icon-wrapper-user-In" onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} className="icon-spacing-user-In" />
        <span className="icon-label">Mi carrito</span>
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

      {/* Barra lateral del carrito */}
      <div className={`sidebar-cart ${isCartOpen ? 'active' : ''}`}>
        <h3>Mis productos</h3>
        {/* Aquí puedes agregar la lista de productos o contenido adicional */}
        <div className="cart-buttons">
          <button className="pay-button">Ir a pagar</button>
          <button className="continue-button" onClick={closeCart}>Seguir comprando</button>
        </div>
      </div>
    </div>
  );
}

export default UserIn;
