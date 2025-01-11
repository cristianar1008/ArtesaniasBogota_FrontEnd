import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn-Admin.css';
import backendConfig from '../../backEnd.json';

function UserIn_Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showLoginModal = () => {
    Swal.fire({
      title: 'Iniciar sesión',
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Correo" />
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña" />
        <div class="forgot-password">
          <a href="#" style="text-decoration: none; font-size: 0.9em;">¿Olvidó su contraseña?</a>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Iniciar sesión',
      customClass: {
        title: 'swal-title',
        confirmButton: 'btn-confirm',
      },
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;
  
        if (!email || !password) {
          Swal.showValidationMessage('Por favor ingresar usuario y contraseña');
          return false; // No cerrar el modal
        }
  
        return { email, password }; // Retorna un objeto con los valores
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí usamos los valores obtenidos del modal
        const { email, password } = result.value; // Accedemos a los valores de email y password
        console.log('Datos ingresados:', email, password);
        
        // Actualizamos el estado con los valores usando los setEmail y setPassword
        setEmail(email);
        setPassword(password);
        
        // Llamamos a la función de login
        handleLogin();
      }
    });
  };
  

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

  const showRegisterModal = () => {
    Swal.fire({
      title: 'Formulario de Registro',
      html: `
        <input type="text" id="documento" class="swal2-input" placeholder="Número de documento de identidad" required />
        <input type="text" id="primerNombre" class="swal2-input" placeholder="Primer nombre" required />
        <input type="text" id="segundoNombre" class="swal2-input" placeholder="Segundo nombre" />
        <input type="text" id="primerApellido" class="swal2-input" placeholder="Primer apellido" required />
        <input type="text" id="segundoApellido" class="swal2-input" placeholder="Segundo apellido" required />
        <input type="tel" id="telefono" class="swal2-input" placeholder="Número de teléfono" required />
        <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de residencia" required />
        <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico" required />
        <label style="font-size: 15px; color: black;">Fecha de nacimiento</label><br />
        <input type="date" id="fechaNacimiento" class="swal2-input" required />
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña" required />
      `,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Registrarse',
      customClass: {
        confirmButton: 'btn-confirm',
        title: 'swal-title'
      },
      preConfirm: () => {
        const documento = Swal.getPopup().querySelector('#documento').value;
        const primerNombre = Swal.getPopup().querySelector('#primerNombre').value;
        const segundoNombre = Swal.getPopup().querySelector('#segundoNombre').value;
        const primerApellido = Swal.getPopup().querySelector('#primerApellido').value;
        const segundoApellido = Swal.getPopup().querySelector('#segundoApellido').value;
        const telefono = Swal.getPopup().querySelector('#telefono').value;
        const direccion = Swal.getPopup().querySelector('#direccion').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const fechaNacimiento = Swal.getPopup().querySelector('#fechaNacimiento').value;
        const password = Swal.getPopup().querySelector('#password').value;
  
        // Validación de los campos requeridos
        if (!documento || !primerNombre || !primerApellido || !telefono || !direccion || !email || !fechaNacimiento || !password) {
          Swal.showValidationMessage('Por favor, completa todos los campos requeridos');
          return false;
        }
  
        // Retornamos los valores del formulario
        return {
          documento,
          primerNombre,
          segundoNombre,
          primerApellido,
          segundoApellido,
          telefono,
          direccion,
          email,
          fechaNacimiento,
          password,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener los valores del formulario
        const {
          documento,
          primerNombre,
          segundoNombre,
          primerApellido,
          segundoApellido,
          telefono,
          direccion,
          email,
          fechaNacimiento,
          password,
        } = result.value;
  
        // Establecer los valores en los useState
        setDocumento(documento);
        setPrimerNombre(primerNombre);
        setSegundoNombre(segundoNombre);
        setPrimerApellido(primerApellido);
        setSegundoApellido(segundoApellido);
        setTelefono(telefono);
        setDireccion(direccion);
        setEmail(email);
        setFechaNacimiento(fechaNacimiento);
        setPassword(password);
  
        // Ahora podemos usar estos valores para manejar el registro
        handleRegister();
      }
    });
  };
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleUser = () => {
    window.location.href = '/userAdmin';
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
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          timer: 3000,  // 3000 milisegundos = 3 segundos
          showConfirmButton: false,  // Para no mostrar el botón de confirmación
        });
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

  const handleRegister = () => {
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

     <div className="icon-wrapper-user-In" >
        <FontAwesomeIcon icon={faUserTie} className="icon-spacing-user-In" />
        <span className="icon-label">Usuarios</span>
      </div>

      <div className="icon-wrapper-user-In" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
        <span className="icon-label">Mi cuenta</span>
        {isMenuOpen && (
          <div className="dropdown-menu-user-In">
            <div className="menu-item-user-In" onClick={showLoginModal}>Mi perfil</div>
            <div className="menu-item-user-In" onClick={showRegisterModal}>Actualizar contraseña</div>
            <div className="menu-item-user-In" onClick={showRegisterModal}>Cerrar sesión</div>
          </div>
        )}
      </div>

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
    </div>
  );
}

export default UserIn_Admin;
