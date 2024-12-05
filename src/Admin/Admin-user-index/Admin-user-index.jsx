import { useState } from 'react';
import './Admin-user-index.css'
import AdminUserDataTable from './Admin-user-dataTable'
import Swal from 'sweetalert2';


function AdminUserIndex() {

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
const [rol, setRol] = useState('Cliente');

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
      <select id="rol" class="swal2-input">
        <option value="Administrador">Administrador</option>
        <option value="Empleado">Empleado</option>
        <option value="Cliente" selected>Cliente</option>
      </select>
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
      const rol = Swal.getPopup().querySelector('#rol').value;

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
        rol,
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
        rol,
      } = result.value;

      // Establecer los valores en los useState
      setDocumento(documento);
      setPrimerNombre(primerNombre);
      setSegundoNombre(segundoNombre);
      setPrimerApellido(primerApellido);
      setSegundoApellido(segundoApellido);
      setTelefono(telefono);
      setDireccion(direccion);
      setFechaNacimiento(fechaNacimiento);
      setRol(rol);

      // Ahora podemos usar estos valores para manejar el registro
      handleRegister();
    }
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
      rol,
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
    <>

    
    <div className='container-body'>
      <center><h1>Gestión usuarios</h1></center>
      <div>
              <button className = 'buttonRegister' onClick={showRegisterModal}>Registrar usuario</button>

            <AdminUserDataTable></AdminUserDataTable>
      </div>
    </div>
    

    </>
  )
}

export default AdminUserIndex