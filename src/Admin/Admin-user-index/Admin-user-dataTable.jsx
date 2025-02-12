import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Checkbox, Switch } from '@mui/material';
import axios from 'axios';


const AdminUserDataTable = ({ onUserSelect }) => {

  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;
  const apiUrl_login = import.meta.env.VITE_APP_API_URL_LOGIN;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null; // Devuelve null si la cookie no existe
  }
  

  useEffect(() => {
    const token = getCookie('token'); // Obtén el token desde las cookies
    console.log(token)
    fetch(`${apiUrl_login}/api/usuarios/list`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token en los headers
        'Content-Type': 'application/json', // Indica que se espera JSON
      },
      method: 'GET',
      
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((user) => ({
          ...user,
          fecha_nacimiento: user.fecha_nacimiento
            ? new Date(user.fecha_nacimiento).toISOString().split('T')[0]
            : '',
          activo: true,
        }));
        setRows(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de usuarios:', error);
        setLoading(false);
      });
  }, []);
  
  // Filtrar los datos de los usuarios
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      (value ?? '').toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Manejar la selección de un usuario
  const handleCheckboxChange = (id) => {
    if (selectedUserId === id) {
      setSelectedUserId(null); // Desmarcar el usuario
      onUserSelect(null); // Notificar al componente principal que no hay usuario seleccionado
    } else {
      const selectedUser = rows.find((row) => row.documento === id);
      setSelectedUserId(id); // Marcar el usuario
      onUserSelect(selectedUser); // Notificar al componente principal el usuario seleccionado
    }
  };

  // Manejar el cambio de estado del switch
  const handleSwitchChange = (id, isActive) => {
    const token = getCookie('token');
    const updatedRows = rows.map((row) =>
      row.documento === id ? { ...row, activo: isActive } : row
    );
    setRows(updatedRows); // Actualizar el estado local de los usuarios

    // Actualizar el backend con el nuevo estado
    fetch(`${apiUrl_login}/api/usuarios/status/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
          },
          // body: JSON.stringify({ activo: isActive })
        })
        .then(response => {
          console.log(response)
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          
        })
        .then(() => {
        
          console.log(`Usuario ${id} actualizado a estado ${isActive ? true : false}`);
        })
        .catch(error => {
          console.error( error);
          // Si falla, revertir el cambio en el estado local
          setRows(rows);
        });
  };

  // Definir las columnas del DataGrid
  const columns = [
    {
      field: 'modificar',
      headerName: 'Modificar',
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          checked={selectedUserId === params.row.documento}
          onChange={() => handleCheckboxChange(params.row.documento)}
        />
      ),
    },
    {
      field: 'activo',
      headerName: 'Activo',
      flex: 1,
      renderCell: (params) => (
        
        <Switch
          checked={params.row.isActive}
          onChange={(e) => handleSwitchChange(params.row.documento, e.target.checked)}
          color="primary"
        />
      ),
    },
    { field: 'documento', headerName: 'Documento', flex: 2 },
    { field: 'fechaNacimiento', headerName: 'Fecha Nacimiento', flex: 2 },
    { field: 'telefono', headerName: 'Teléfono', flex: 2 },
    { field: 'primerNombre', headerName: 'Primer Nombre', flex: 2 },
    { field: 'segundoNombre', headerName: 'Segundo Nombre', flex: 2 },
    { field: 'primerApellido', headerName: 'Primer Apellido', flex: 2 },
    { field: 'segundoApellido', headerName: 'Segundo Apellido', flex: 2 },
    { field: 'fechaCreacion', headerName: 'Fecha Creación', flex: 2 },
    { field: 'direccion', headerName: 'Dirección', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
      <TextField
        label="Buscar usuario..."
        variant="outlined"
        fullWidth
        sx={{ maxWidth: 800 }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <Box sx={{ width: '100%', maxWidth: '90vw', overflowX: 'auto', backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ minWidth: 800 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            loading={loading}
            getRowId={(row) => row.documento}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminUserDataTable;

