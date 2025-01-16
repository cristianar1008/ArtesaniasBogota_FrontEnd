import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faUserTie, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn-Admin.css';
import backendConfig from '../../backEnd.json';

function UserIn_Admin() {
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const deleteAllCookiesAndRedirect = () => {
    // Borrar todas las cookies
    const cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
  
    window.location.href = '/';
  };

  

  const closeModal = () => {
    setIsModalOpen(false);
  };

 

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
    setIsMenuOpen(false);
    setIsModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const showStock = () =>{
    window.location.href = '/stock';
  }
  const redirectToUserAdmin = () => {
    window.location.href = '/home';
  };

  return (
    <div className="user-in-container-user-In">
      
    {/* Icono de Home */}
    
    {/* Icono de Inventario */}
    <div className="icon-wrapper-user-In">
      <FontAwesomeIcon icon={faWarehouse} onClick={showStock} className="icon-spacing-user-In" />
      <span className="icon-label">Inventario</span>
    </div>

    {/* Icono de Usuarios */}
    <div className="icon-wrapper-user-In">
      <FontAwesomeIcon icon={faUserTie} onClick={redirectToUserAdmin} className="icon-spacing-user-In" />
      <span className="icon-label">Usuarios</span>
    </div>

    {/* Icono de Mi Cuenta */}
    <div className="icon-wrapper-user-In" onClick={toggleMenu}>
      <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
      <span className="icon-label">Mi cuenta</span>
      {isMenuOpen && (
        <div className="dropdown-menu-user-In">
          <div className="menu-item-user-In">Mi perfil</div>
          <div className="menu-item-user-In">Actualizar contraseña</div>
          <div className="menu-item-user-In" onClick={deleteAllCookiesAndRedirect}>Cerrar sesión</div>
        </div>
      )}
    </div>

    {/* Icono del Carrito */}
    <div className="icon-wrapper-user-In" onClick={toggleCart}>
      <FontAwesomeIcon icon={faShoppingCart} className="icon-spacing-user-In" />
      <span className="icon-label">Mi carrito</span>
    </div>

    {/* Barra lateral del carrito */}
    <div className={`sidebar-cart ${isCartOpen ? 'active' : ''}`}>
      <h3>Mis productos</h3>
      <div className="cart-buttons">
        <button className="pay-button">Ir a pagar</button>
        <button className="continue-button" onClick={closeCart}>Seguir comprando</button>
      </div>
    </div>

    <div className="icon-wrapper-user-In">
      <FontAwesomeIcon icon={faHome} className="icon-spacing-user-In" onClick={() => window.location.href = '/'} />
      <span className="icon-label">Inicio</span>
    </div>
    
    
  </div>
  );
}

export default UserIn_Admin;
