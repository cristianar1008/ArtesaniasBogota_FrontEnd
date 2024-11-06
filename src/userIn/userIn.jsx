import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn.css';
import backendConfig from '../backEnd.json';

function UserIn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Campos de registro
  const [documento, setDocumento] = useState('');
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaCreacion] = useState(new Date().toISOString().split('T')[0]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
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

  const handleLogin = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: 'JSESSIONID=7B9D7FB426EADAD108536448C18CBF71',
      },
      body: JSON.stringify({ email, password }),
    };

    fetch(`${backendConfig.host}auth/login`, options)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo o contraseña incorrectos',
            css: {
              'font-family': 'Arial, sans-serif',
              'font-size': '16px',
            }
          });
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = '/home';
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Interno',
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault(); // Evita el envío del formulario

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: 'JSESSIONID=7B9D7FB426EADAD108536448C18CBF71',
      },
      body: JSON.stringify({
        documento,
        fechaNacimiento,
        telefono: Number(telefono),
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        fechaCreacion,
        direccion,
        contrasenia: password,
        email,
      }),
    };

    fetch(`${backendConfig.host}auth/register`, options)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error en el registro. Verifique sus datos.',
          });
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El usuario ha sido registrado exitosamente',
        });
        closeRegisterModal();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Interno',
        });
      });
  };

  return (
    <div className="user-in-container-user-In">
      <div className="icon-wrapper-user-In" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
        <span className="icon-label">Mi cuenta</span>
        {isMenuOpen && (
          <div className="dropdown-menu-user-In">
            <div className="menu-item-user-In" onClick={openModal}>Iniciar sesión</div>
            <div className="menu-item-user-In" onClick={openRegisterModal}>
              Registrarse
            </div>
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
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Iniciar Sesión</button>
            <div className="forgot-password">
              <a href="#">¿Olvidó su contraseña?</a>
            </div>
          </div>
        </div>
      )}

      {/* Modal de registro */}
      {isRegisterModalOpen && (
        <div className="modal-overlay" onClick={closeRegisterModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Número de documento de identidad" required value={documento} onChange={(e) => setDocumento(e.target.value)} />
              <input type="text" placeholder="Primer nombre" required value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} />
              <input type="text" placeholder="Segundo nombre" value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} />
              <input type="text" placeholder="Primer apellido" required value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
              <input type="text" placeholder="Segundo apellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
              <input type="tel" placeholder="Número de teléfono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              <input type="text" placeholder="Dirección de residencia" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label style={{ fontSize: '15px', color: 'black' }}>Fecha de nacimiento</label><br />
              <input type="date" placeholder="Fecha de nacimiento" required value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
              <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Registrarse</button>
            </form>
          </div>
        </div>
      )}
       {/* Barra lateral del carrito */}
       <div className={`sidebar-cart ${isCartOpen ? 'active' : ''}`}>
        <h3>Mis productos</h3>
        <div className="cart-buttons">
          <button className="pay-button">Ir a pagar</button>
          <button className="continue-button" onClick={closeCart}>Seguir comprando</button>
        </div>
      </div>
    </div>
  );
}

export default UserIn;



     


