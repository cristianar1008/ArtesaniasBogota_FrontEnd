import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn.css';
import backendConfig from '../backEnd.json';
import CardShop from '../card-shop/card-shop';

function UserIn({ carrito, handleUpdateQuantity, handleRemoveItem }) {
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
        handleLogin(email, password);
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

  const showRegisterModal = async () => {
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
            <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirmar Contraseña" required />
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
            const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;

            // Validación de los campos requeridos
            if (!documento || !primerNombre || !primerApellido || !telefono || !direccion || !email || !fechaNacimiento || !password || !confirmPassword) {
                Swal.showValidationMessage('Por favor, completa todos los campos requeridos');
                return false;
            }

            // Validación de contraseña
            if (!validatePassword(password)) {
                Swal.showValidationMessage('La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.');
                return false;
            }

            // Verificar si las contraseñas coinciden
            if (password !== confirmPassword) {
                Swal.showValidationMessage('Las contraseñas no coinciden.');
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
                password
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
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
                password
            } = result.value;

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
            let code = await sendEmail(email)
        
            showValidateModal(code, documento,
                fechaNacimiento,
                telefono,
                primerNombre,
                segundoNombre,
                primerApellido,
                segundoApellido,
                direccion,
                password,
                email)
            // handleRegister(documento,
            //   fechaNacimiento,
            //   telefono,
            //   primerNombre,
            //   segundoNombre,
            //   primerApellido,
            //   segundoApellido,
            //   direccion,
            //   password,
            //   email
            //   );
        }
    });
};

const showValidateModal = (code,  
  documento,
  fechaNacimiento,
  telefono,
  primerNombre,
  segundoNombre,
  primerApellido,
  segundoApellido,
  direccion,
  password,
  email) => {

  Swal.fire({
    title: 'Validación de correo',
    html: `
      <input type="number" id="code" class="swal2-input" placeholder="Ingrese el código enviado a su email" />
    `,
    showCloseButton: true,
    showCancelButton: false,
    confirmButtonText: 'Enviar',
    customClass: {
      title: 'swal-title',
      confirmButton: 'btn-confirm',
    },
    preConfirm: () => {
      const codeU = Swal.getPopup().querySelector('#code').value;
    

      if (!codeU) {
        Swal.showValidationMessage('Por favor ingrese el código');
        return false; // No cerrar el modal
      }
      if(Number(codeU) != Number(code)){
        Swal.showValidationMessage('Código incorrecto');
        return false; // No cerrar el modal

      }

      return codeU 
    },
  }).then((result) => {
    if (result.isConfirmed) {
      handleRegister( documento,
        fechaNacimiento,
        telefono,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        direccion,
        password,
        email);
    }
  });
};



// Función para validar la contraseña
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
};

  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
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

  const handleLogin = (e, p) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: e, password: p }),
    };
  
    fetch(`http://localhost:8080/auth/login`, options)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo o contraseña incorrectos',
            css: {
              'font-family': 'Arial, sans-serif',
              'font-size': '16px',
            },
          });
          throw new Error('Correo o contraseña incorrectos'); // Interrumpe la cadena de promesas.
        } else {
          return response.json(); // Convierte la respuesta a JSON.
        }
      })
      .then((data) => {
        console.log('Respuesta del servidor:', data);
  
        // Guardar datos en cookies
        document.cookie = `direccion=${encodeURIComponent(data.direccion)}; path=/`;
        document.cookie = `documento=${encodeURIComponent(data.documento)}; path=/`;
        document.cookie = `email=${encodeURIComponent(data.email)}; path=/`;
        document.cookie = `fechaCreacion=${encodeURIComponent(data.fechaCreacion)}; path=/`;
        document.cookie = `fechaNacimiento=${encodeURIComponent(data.fechaNacimiento)}; path=/`;
        document.cookie = `isActive=${data.isActive}; path=/`;
        document.cookie = `primerApellido=${encodeURIComponent(data.primerApellido)}; path=/`;
        document.cookie = `primerNombre=${encodeURIComponent(data.primerNombre)}; path=/`;
        document.cookie = `roles=${encodeURIComponent(JSON.stringify(data.roles))}; path=/`;
        document.cookie = `segundoApellido=${encodeURIComponent(data.segundoApellido)}; path=/`;
        document.cookie = `segundoNombre=${encodeURIComponent(data.segundoNombre)}; path=/`;
        document.cookie = `telefono=${data.telefono}; path=/`;
        document.cookie = `token=${data.token}; path=/`;
  
        // Redireccionar si es necesario
        // window.location.href = '/home';
      })
      .catch((err) => {
        console.error('Error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Interno',
        });
      });
  };
  
  

  const sendEmail = async (e) => {
    try {
        const response = await fetch("http://localhost:8081/api/email_auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                toEmail: e
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.message === 'Ok') {
            return data.confirmCode; // Retorna solo el código
        } else {
            throw new Error("Failed to send email");
        }
    } catch (error) {
        console.error("Error:", error.message);
        return null; // Retorna null en caso de error
    }
};



  const handleRegister = (d, fN, t, p, s, pA, sA, dir, pss, em) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        documento: d,
        fechaNacimiento: fN,
        telefono: Number(t),
        primerNombre: p,
        segundoNombre: s,
        primerApellido: pA,
        segundoApellido: sA,
        fechaCreacion: fechaCreacion,
        direccion: dir,
        contrasenia: pss,
        email: em}),
    };
    console.log(options)
  
    fetch('http://localhost:8081/api/usuarios/create/cliente', options)
      .then((response) => {
        console.log(response)
        if (response.ok == false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error en el registro. Verifique sus datos.',
          });
          throw new Error('Registration failed');
        }
        if (response.ok == true) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El usuario ha sido registrado exitosamente',
          });
        }
        return response.json();
      })
      .catch((err) => {
        // console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Interno',
        });
      });
  };

  const getCookies = () => {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return cookies;
  };
 
  const handleBill = () => {
    // Validar si existe la cookie "documento"
    const cookies = getCookies();
    if (!cookies.documento) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión antes de continuar con el pago.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Continuar con el proceso de pago
    console.log("Documento encontrado. Continuar con el pago.");
    // Aquí puedes redirigir o manejar la lógica del pago
    window.location.href = '/bill';
  };

  return (
    <div className="user-in-container-user-In">
      <div className="icon-wrapper-user-In" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
        <span className="icon-label">Mi cuenta</span>
        {isMenuOpen && (
          <div className="dropdown-menu-user-In">
            <div className="menu-item-user-In" onClick={showLoginModal}>Iniciar sesión</div>
            <div className="menu-item-user-In" onClick={showRegisterModal}>Registrarse</div>
          </div>
        )}
      </div>

      <div className="icon-wrapper-user-In" onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} className="icon-spacing-user-In" />
        <span className="icon-label">Mi carrito</span>
      </div>


       {/* Barra lateral del carrito */}
       <div className={`sidebar-cart ${isCartOpen ? 'active' : ''}`}>
        <center><h3>Mis productos</h3></center>
        {/* <div class="cart-item">
          <img src="https://vpinteriorismo.com/8107-large_default/pieza-decorativa-etnica-metal-marmol-n1.jpg" alt="Producto X" class="cart-item-image" />
          <div class="cart-item-details">
            <h4 class="cart-item-name">Producto X</h4>
            <p class="cart-item-price">$120,000</p>
          </div>
        </div> */}
        <CardShop
          carrito={carrito}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />


        <div className="cart-buttons">
          <button className="pay-button" onClick={handleBill}>Ir a pagar</button>
          <button className="continue-button" onClick={closeCart}>Seguir comprando</button>
        </div>
      </div>
    </div>
  );
}

export default UserIn;



     


