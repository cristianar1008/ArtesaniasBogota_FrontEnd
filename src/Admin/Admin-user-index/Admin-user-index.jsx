import { useState } from 'react';
import './Admin-user-index.css';
import AdminUserDataTable from './Admin-user-dataTable';
import Swal from 'sweetalert2';

function AdminUserIndex() {
  
  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;
  const apiUrl_login = import.meta.env.VITE_APP_API_URL_LOGIN;

  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado

  // Función para formatear fecha al formato `yyyy-MM-dd` para campos de tipo `date`
  const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Mostrar modal de usuario (registro o edición)
  const showUserModal = (user = null) => {
    Swal.fire({
      title: user ? 'Modificar usuario' : 'Registrar usuario',
      html: `
        <input type="text" id="documento" class="swal2-input" placeholder="Número de documento" value="${user?.documento || ''}" required />
        <input type="date" id="fechaNacimiento" class="swal2-input" value="${user ? formatDateToYYYYMMDD(user.fechaNacimiento) : ''}" required />
        <input type="tel" id="telefono" class="swal2-input" placeholder="Teléfono" value="${user?.telefono || ''}" required />
        <input type="text" id="primerNombre" class="swal2-input" placeholder="Primer nombre" value="${user?.primerNombre || ''}" required />
        <input type="text" id="segundoNombre" class="swal2-input" placeholder="Segundo nombre" value="${user?.segundoNombre || ''}" />
        <input type="text" id="primerApellido" class="swal2-input" placeholder="Primer apellido" value="${user?.primerApellido || ''}" required />
        <input type="text" id="segundoApellido" class="swal2-input" placeholder="Segundo apellido" value="${user?.segundoApellido || ''}" required />
        <input type="text" id="direccion" class="swal2-input" placeholder="Dirección" value="${user?.direccion || ''}" required />
        <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico" value="${user?.email || ''}" required />
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: user ? 'Modificar' : 'Registrar',
      preConfirm: () => {
        const documento = Swal.getPopup().querySelector('#documento').value;
        const primerNombre = Swal.getPopup().querySelector('#primerNombre').value;
        const segundoNombre = Swal.getPopup().querySelector('#segundoNombre').value;
        const primerApellido = Swal.getPopup().querySelector('#primerApellido').value;
        const segundoApellido = Swal.getPopup().querySelector('#segundoApellido').value;
        const telefono = Swal.getPopup().querySelector('#telefono').value;
        const direccion = Swal.getPopup().querySelector('#direccion').value;
        const fecha_nacimiento = Swal.getPopup().querySelector('#fechaNacimiento').value;
        const email = Swal.getPopup().querySelector('#email').value;

        if (!documento || !primerNombre || !primerApellido || !telefono || !direccion || !fecha_nacimiento || !email) {
          Swal.showValidationMessage('Por favor, completa todos los campos requeridos');
          return false;
        }

        return {
          documento,
          primer_nombre: primerNombre,
          segundo_nombre: segundoNombre,
          primer_apellido: primerApellido,
          segundo_apellido: segundoApellido,
          telefono,
          direccion,
          fecha_nacimiento,
          email,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const userData = result.value;
        if (user) {
          handleUpdate(userData);
        } else {
          handleRegister(userData);
        }
      }
    });
  };

  // Registrar usuario
  const handleRegister = (userData) => {
    fetch(`${apiUrl_artesanias}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en el registro');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire('Éxito', 'Usuario registrado correctamente', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
      });
  };

  // Modificar usuario
  const handleUpdate = (userData) => {
    fetch(`${apiUrl_artesanias}/api/usuarios/update?id=${userData.documento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la actualización');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire('Éxito', 'Usuario modificado correctamente', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo modificar el usuario', 'error');
      });
  };
  

  return (
    <div className='container-body'>
      <center><h1>Gestión usuarios</h1></center>
      <div>
        <button className='buttonRegister' onClick={() => showUserModal()}>Registrar usuario</button>
        <button
          className='buttonEdit'
          style={{ display: 'inline-block', marginLeft: '10px' }}
          onClick={() => selectedUser ? showUserModal(selectedUser) : Swal.fire('Error', 'No hay usuario seleccionado', 'error')}
        >
          Modificar usuario
        </button>
        <AdminUserDataTable onUserSelect={setSelectedUser} />
      </div>
    </div>
  );
}

export default AdminUserIndex;
