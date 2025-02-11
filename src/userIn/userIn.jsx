import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faUserTie, faUser, faShoppingCart, faFileAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './userIn.css';

import CardShop from '../card-shop/card-shop';

function UserIn({ carrito, handleUpdateQuantity, handleRemoveItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;
  const apiUrl_login = import.meta.env.VITE_APP_API_URL_LOGIN;

  

  const showUpdatePss = async () => {
      Swal.fire({
          title: 'Actualizar Contraseña',
          html: `
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
              const userId = 1001402110; // ID de usuario
              const cookies = getCookies();
              const url = `${apiUrl_login}}/api/usuarios/change_password/${cookies["documento"]}`;
  
              try {
                  const response = await fetch(url, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
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
        width: 700, // Ajuste del ancho
        html: `
            <input type="text" id="documento" class="swal2-input" placeholder="Número de documento de identidad" required />
            <input type="text" id="primerNombre" class="swal2-input" placeholder="Primer nombre" required />
            <input type="text" id="segundoNombre" class="swal2-input" placeholder="Segundo nombre" />
            <input type="text" id="primerApellido" class="swal2-input" placeholder="Primer apellido" required />
            <input type="text" id="segundoApellido" class="swal2-input" placeholder="Segundo apellido" required />
            <input type="tel" id="telefono" class="swal2-input" placeholder="Número de teléfono" required />
            <label style="font-size: 15px; color: black;">Dirección</label><br />
            <div class="direccion-container">
              <!-- Primera Fila -->
              <div class="direccion-row">
                  <select id="tipoVia" class="direccion-select">
                      <option value="Calle">Calle</option>
                      <option value="Carrera" selected>Carrera</option>
                      <option value="Avenida">Avenida</option>
                      <option value="Transversal">Transversal</option>
                  </select>

                  <input type="text" id="direccion1" class="direccion-input" placeholder="Ej: 10A" />

                  <select id="letra1" class="direccion-select">
                      <option value=""></option>
                      <option value="A">A</option>
                      <option value="B" selected>B</option>
                      <option value="C">C</option>
                  </select>

                  <select id="cardinal1" class="direccion-select">
                      <option value=""></option>
                      <option value="NORTE">NORTE</option>
                      <option value="SUR">SUR</option>
                      <option value="ESTE" selected>ESTE</option>
                      <option value="OESTE">OESTE</option>
                  </select>
              </div>

              <!-- Segunda Fila -->
              <div class="direccion-row">
                  <label class="direccion-label">#</label>

                  <input type="text" id="direccion2" class="direccion-input" placeholder="Ej: 20B" />

                  <select id="letra2" class="direccion-select">
                      <option value=""></option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C" selected>C</option>
                  </select>

                  <input type="text" id="direccion3" class="direccion-input" placeholder="Ej: 30" />

                  <select id="cardinal2" class="direccion-select">
                      <option value=""></option>
                      <option value="NORTE">NORTE</option>
                      <option value="SUR" selected>SUR</option>
                      <option value="ESTE">ESTE</option>
                      <option value="OESTE">OESTE</option>
                  </select>
              </div>
          </div>
            <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico" required /><br/>
            <label style="font-size: 15px; color: black;">Fecha de nacimiento</label><br />
            <input type="date" id="fechaNacimiento" class="swal2-input" required />
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña" required />
            <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirmar Contraseña" required />
        `,
        showCloseButton: true,
        confirmButtonText: 'Registrarse',
        customClass: {
            confirmButton: 'btn-confirm',
            title: 'swal-title',
            popup: 'custom-width' // Aplica el ancho personalizado
        },
        preConfirm: () => {
            const documento = Swal.getPopup().querySelector('#documento').value;
            const primerNombre = Swal.getPopup().querySelector('#primerNombre').value;
            const segundoNombre = Swal.getPopup().querySelector('#segundoNombre').value;
            const primerApellido = Swal.getPopup().querySelector('#primerApellido').value;
            const segundoApellido = Swal.getPopup().querySelector('#segundoApellido').value;
            const telefono = Swal.getPopup().querySelector('#telefono').value;
            const tipoVia = Swal.getPopup().querySelector('#tipoVia').value;
            const direccion1 = Swal.getPopup().querySelector('#direccion1').value;
            const letra1 = Swal.getPopup().querySelector('#letra1').value;
            const cardinal1 = Swal.getPopup().querySelector('#cardinal1').value;
            const direccion2 = Swal.getPopup().querySelector('#direccion2').value;
            const letra2 = Swal.getPopup().querySelector('#letra2').value;
            const direccion3 = Swal.getPopup().querySelector('#direccion3').value;
            const cardinal2 = Swal.getPopup().querySelector('#cardinal2').value;
            const email = Swal.getPopup().querySelector('#email').value;
            const fechaNacimiento = Swal.getPopup().querySelector('#fechaNacimiento').value;
            const password = Swal.getPopup().querySelector('#password').value;
            const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;

            if (!documento || !primerNombre || !primerApellido || !telefono || !direccion1 || !direccion2 || !direccion3 || !email || !fechaNacimiento || !password || !confirmPassword) {
                Swal.showValidationMessage('Por favor, completa todos los campos requeridos');
                return false;
            }

            if (!validatePassword(password)) {
                Swal.showValidationMessage('La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.');
                return false;
            }

            if (password !== confirmPassword) {
                Swal.showValidationMessage('Las contraseñas no coinciden.');
                return false;
            }

            const direccionCompleta = `${tipoVia} ${direccion1} ${letra1} ${cardinal1} # ${direccion2} ${letra2} - ${direccion3} ${cardinal2}`.replace(/\s+/g, ' ').trim();

            return {
                documento,
                primerNombre,
                segundoNombre,
                primerApellido,
                segundoApellido,
                telefono,
                direccion: direccionCompleta,
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
            let code = await sendEmail(email);

            showValidateModal(code, documento, fechaNacimiento, telefono, primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, password, email);
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
  
    fetch(`${apiUrl_login}/auth/login`, options)
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
        window.location.reload();
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
        const response = await fetch(`${apiUrl_login}/api/email_auth`, {
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
  
    fetch(`${apiUrl_login}/api/usuarios/create/cliente`, options)
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
      acc[key] = decodeURIComponent(value || ""); // Asegura un valor vacío si no existe.
      return acc;
    }, {});
    return cookies;
  };
 
  const isCookieEmptyOrMissing = (cookieName) => {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = decodeURIComponent(value || ""); // Asegura un valor vacío si no existe.
      return acc;
    }, {});
  
    return !cookies[cookieName] || cookies[cookieName].trim() === ""; // Retorna true si la cookie no existe o está vacía.
  };

  const deleteAllCookiesAndRefresh = () => {
    // Borrar todas las cookies
    const cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
  
    // Recargar la página
    window.location.reload();
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

  const redirectToUserAdmin = () => {
    window.location.href = '/home';
  };
  
  const showStock = () =>{
    window.location.href = '/stock';
  }

  const showOrder = () =>{
    window.location.href = '/order';
  }
  const showReport = () =>{
    window.location.href = '/report';
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
    {isCookieEmptyOrMissing("documento") ? (
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
    ) : (
      <>
        {/* Opciones según el rol */}
        {userRoles.includes("Admin") && (
          <>
            <div className="icon-wrapper-user-In">
              <FontAwesomeIcon icon={faWarehouse} onClick={showStock} className="icon-spacing-user-In" />
              <span className="icon-label">Inventario</span>
            </div>
            <div className="icon-wrapper-user-In">
              <FontAwesomeIcon icon={faUserTie} className="icon-spacing-user-In" />
              <span className="icon-label" onClick={redirectToUserAdmin}>Usuarios</span>
            </div>
            <div className="icon-wrapper-user-In">
              <FontAwesomeIcon icon={faFileAlt} className="icon-spacing-user-In" onClick={showReport} />
              <span className="icon-label">Reportes</span>
            </div>
            <div className="icon-wrapper-user-In">
              <FontAwesomeIcon icon={faClipboardList} className="icon-spacing-user-In" onClick={showOrder} />
              <span className="icon-label">Pedidos</span>
            </div>
          </>
        )}

        {userRoles.includes("Empleado") && (
          <div className="icon-wrapper-user-In">
            <FontAwesomeIcon icon={faWarehouse} onClick={showStock} className="icon-spacing-user-In" />
            <span className="icon-label">Inventario</span>
          </div>
        )}

        <div className="icon-wrapper-user-In" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faUser} className="icon-spacing-user-In" />
          <span className="icon-label">Mi cuenta</span>
          {isMenuOpen && (
            <div className="dropdown-menu-user-In">
              <div className="menu-item-user-In" onClick={showLoginModal}>Mi perfil</div>
              <div className="menu-item-user-In" onClick={showUpdatePss}>Actualizar contraseña</div>
              <div className="menu-item-user-In" onClick={deleteAllCookiesAndRefresh}>Cerrar sesión</div>
            </div>
          )}
        </div>
      </>
    )}

    <div className="icon-wrapper-user-In" onClick={toggleCart}>
      <FontAwesomeIcon icon={faShoppingCart} className="icon-spacing-user-In" />
      <span className="icon-label">Mi carrito</span>
    </div>

    <div className="icon-wrapper-user-In">
      <FontAwesomeIcon icon={faHome} className="icon-spacing-user-In" onClick={() => window.location.href = '/'} />
      <span className="icon-label">Inicio</span>
    </div>

    <div className={`sidebar-cart ${isCartOpen ? 'active' : ''}`}>
      <center><h3>Comprar</h3></center>
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



     


