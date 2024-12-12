import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Switch } from '@mui/material';
import axios from 'axios'; // Importar axios

const AdminUserDataTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    fecha_nacimiento: false, // Columna oculta inicialmente
    fecha_creacion: false,   // Columna oculta inicialmente
  });

  // Obtener datos de usuarios desde el backend
  useEffect(() => {
    axios.get('http://localhost:8081/api/usuarios/list') 
      .then((response) => {
        console.log(response.data)
        setRows(response.data);  
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de usuarios', error);
        setLoading(false);
      });
  }, []);

  // Filtrar los datos basados en el texto ingresado
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Función para manejar el cambio del estado "active"
  const handleActiveToggle = (id) => {
    // Realizar solicitud PUT para cambiar el estado del usuario
    axios.put(`/api/usuarios/list/${id}`)
      .then((response) => {
        // Actualizar el estado de los usuarios en la UI
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, active: !row.active } : row
          )
        );
      })
      .catch((error) => {
        console.error('Error al cambiar el estado del usuario', error);
      });
  };

  // Columnas para el DataTable
  const columns = [
    { field: 'documento', headerName: 'Documento', flex: 2 },
    { field: 'fecha_nacimiento', headerName: 'Fecha Nacimiento', flex: 2 },
    { field: 'telefono', headerName: 'Teléfono', flex: 2 },
    { field: 'primer_nombre', headerName: 'Primer Nombre', flex: 2 },
    { field: 'segundo_nombre', headerName: 'Segundo Nombre', flex: 2 },
    { field: 'primer_apellido', headerName: 'Primer Apellido', flex: 2 },
    { field: 'segundo_apellido', headerName: 'Segundo Apellido', flex: 2 },
    { field: 'fecha_creacion', headerName: 'Fecha Creación', flex: 2 },
    { field: 'direccion', headerName: 'Dirección', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'active',
      headerName: 'Activo',
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.active}
          onChange={() => handleActiveToggle(params.row.id)}
          color="primary"
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 2,
      }}
    >
      {/* Campo de texto para el filtro */}
      <TextField
        label="Buscar usuario..."
        variant="outlined"
        fullWidth
        sx={{ maxWidth: 800 }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {/* Contenedor para la tabla con scroll horizontal */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '90vw',
          overflowX: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            minWidth: 800, // Ancho mínimo para forzar el scroll horizontal si es necesario
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            loading={loading}  // Muestra el loading mientras se cargan los datos
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminUserDataTable;
