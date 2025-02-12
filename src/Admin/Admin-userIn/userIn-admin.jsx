import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faUserTie, faUser, faShoppingCart, faFileAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn-admin.css';


function UserIn_Admin() {
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return cookies[name] || null;
  };

  const getCookies2 = () => {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = decodeURIComponent(value || ""); // Asegura un valor vacío si no existe.
      return acc;
    }, {});
    return cookies;
  };

  const showUpdatePss = async () => {
    Swal.fire({
        title: 'Actualizar Contraseña',
        html:` 
            <input type="password" id="Old_password" class="swal2-input" placeholder="Anterior contraseña" required />
            <input type="password" id="New_password" class="swal2-input" placeholder="Nueva Contraseña" required />
            <input type="password" id="Confirm_Password" class="swal2-input" placeholder="Confirmar Contraseña" required />
        `,
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Actualizar',
        customClass: {
            confirmButton: 'btn-confirm',
            title: 'swal-title'
        },
        preConfirm: () => {
            const oldPassword = Swal.getPopup().querySelector('#Old_password').value;
            const newPassword = Swal.getPopup().querySelector('#New_password').value;
            const confirmPassword = Swal.getPopup().querySelector('#Confirm_Password').value;

            if (!oldPassword || !newPassword || !confirmPassword) {
                Swal.showValidationMessage('Por favor, completa todos los campos.');
                return false;
            }

            if (!validatePassword(newPassword)) {
                Swal.showValidationMessage('La nueva contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.');
                return false;
            }

            if (newPassword !== confirmPassword) {
                Swal.showValidationMessage('Las contraseñas no coinciden.');
                return false;
            }

            return { oldPassword, newPassword };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { oldPassword, newPassword } = result.value;
            const cookies = getCookies2();
            const url = `${apiUrl_artesanias}}/api/usuarios/change_password/${getCookie("documento")}`;

            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies["token"]}`
                    },
                    body: JSON.stringify({
                        password: oldPassword,
                        newPassword: newPassword
                    })
                });
                
                const data = await response.json();

                if (response.ok) {
                    Swal.fire('Éxito', 'Tu contraseña ha sido actualizada correctamente.', 'success');
                } else {
                    Swal.fire('Error', data.message || 'Hubo un problema al actualizar la contraseña.', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo actualizar la contraseña. Intenta de nuevo más tarde.', 'error');
            }
        }
    });
};

  
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const deleteAllCookiesAndRedirect = () => {
    // Borrar todas las cookies
    const cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0];
      document.cookie =`${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
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
  const showReport = () =>{
    window.location.href = '/report';
  }
  const showOrder = () =>{
    window.location.href = '/order';
  }

  const getCookie2 = (cookieName) => {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
        const [key, value] = current.split("=");
        acc[key] = decodeURIComponent(value || ""); 
        return acc;
    }, {});
    return cookies[cookieName] ? JSON.parse(cookies[cookieName]) : [];
};

const userRoles = getCookie2("roles");
return (
  <div className="user-in-container-user-In">
    
    {/* Icono de Inventario (Disponible para Administrador y Empleado) */}
    {(userRoles.includes("Admin") || userRoles.includes("Empleado")) && (
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faWarehouse} onClick={showStock} className="icon-spacing-user-In" />
        <span className="icon-label">Inventario</span>
      </div>
    )}

    {/* Icono de Usuarios (Solo para Administrador) */}
    {userRoles.includes("Admin") && (
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faUserTie} onClick={redirectToUserAdmin} className="icon-spacing-user-In" />
        <span className="icon-label">Usuarios</span>
      </div>
    )}

    {/* Icono de Reportes (Solo para Administrador) */}
    {userRoles.includes("Admin") && (
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faFileAlt} className="icon-spacing-user-In" onClick={showReport} />
        <span className="icon-label">Reportes</span>
      </div>
    )}

    {/* Icono de Pedidos (Solo para Administrador) */}
    {userRoles.includes("Admin") && (
      <div className="icon-wrapper-user-In">
        <FontAwesomeIcon icon={faClipboardList} className="icon-spacing-user-In" onClick={showOrder} />
        <span className="icon-label">Pedidos</span>
      </div>
    )}

    {/* Icono de Mi Cuenta */}
    <div className="icon-wrapper-user-In" onClick={toggleMenu}>
      <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
      <span className="icon-label">Mi cuenta</span>
      {isMenuOpen && (
        <div className="dropdown-menu-user-In">
          <div className="menu-item-user-In">Mi perfil</div>
          <div className="menu-item-user-In" onClick={showUpdatePss}>Actualizar contraseña</div>
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

    {/* Icono de Inicio */}
    <div className="icon-wrapper-user-In">
      <FontAwesomeIcon icon={faHome} className="icon-spacing-user-In" onClick={() => window.location.href = '/'} />
      <span className="icon-label">Inicio</span>
    </div>
  </div>
);


}
export default UserIn_Admin;