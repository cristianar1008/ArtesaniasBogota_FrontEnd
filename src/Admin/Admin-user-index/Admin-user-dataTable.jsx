import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';

const AdminUserDataTable = () => {
  // Datos de ejemplo
  const [rows, setRows] = useState([
    {
      id: 1,
      documento: '12345678',
      fecha_nacimiento: '1990-01-01',
      telefono: '3001234567',
      primer_nombre: 'Juan',
      segundo_nombre: 'Carlos',
      primer_apellido: 'Pérez',
      segundo_apellido: 'López',
      fecha_creacion: '2023-12-01',
      direccion: 'Calle 123',
      email: 'juan.perez@gmail.com',
    },
    {
      id: 2,
      documento: '87654321',
      fecha_nacimiento: '1985-05-10',
      telefono: '3007654321',
      primer_nombre: 'Ana',
      segundo_nombre: '',
      primer_apellido: 'Gómez',
      segundo_apellido: 'Martínez',
      fecha_creacion: '2023-12-02',
      direccion: 'Carrera 456',
      email: 'ana.gomez@gmail.com',
    },
  ]);

  // Estado para el filtro
  const [filterText, setFilterText] = useState('');

  // Estado para la visibilidad de columnas
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    fecha_nacimiento: false, // Columna oculta inicialmente
    fecha_creacion: false,     // Columna oculta inicialmente
  });

  // Filtrar los datos basados en el texto ingresado
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

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
            columnVisibilityModel={columnVisibilityModel} // Enlaza el modelo de visibilidad
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
