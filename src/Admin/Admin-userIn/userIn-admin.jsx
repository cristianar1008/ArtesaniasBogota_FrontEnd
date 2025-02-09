import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faUserTie, faUser, faShoppingCart, faFileAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn-admin.css';

function UserIn_Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  return (
    <div className="user-in-container-user-In">
      {/* Icono de Inventario */}
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faWarehouse} className="icon-spacing-user-In" />
        <span className="icon-label">Inventario</span>
      </div>

      {/* Icono de Usuarios */}
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faUserTie} className="icon-spacing-user-In" />
        <span className="icon-label">Usuarios</span>
      </div>

      {/* Icono de Mi Cuenta */}
      <div className="icon-wrapper-user-In" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
        <span className="icon-label">Mi cuenta</span>
      </div>

      {/* Icono del Carrito */}
      <div className="icon-wrapper-user-In" onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} className="icon-spacing-user-In" />
        <span className="icon-label">Mi carrito</span>
      </div>

      {/* Icono de Reportes */}
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faFileAlt} className="icon-spacing-user-In" />
        <span className="icon-label">Reportes</span>
      </div>

      {/* Icono de Pedidos */}
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faClipboardList} className="icon-spacing-user-In" />
        <span className="icon-label">Pedidos</span>
      </div>

      {/* Icono de Inicio */}
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faHome} className="icon-spacing-user-In" />
        <span className="icon-label">Inicio</span>
      </div>
    </div>
  );
}

export default UserIn_Admin;
