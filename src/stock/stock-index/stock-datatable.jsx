import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';
import axios from 'axios';

const ProductDataTable = ({ onProductSelect }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  

  // Obtener lista de productos
  useEffect(() => {
    axios.get('http://localhost:8081/api/productos/productos')
      .then((response) => {
        const formattedData = response.data.map((product) => ({
          ...product,
          precioUnitario: `$${product.precioUnitario.toLocaleString()}`, // Formato de precio
        }));
        setRows(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de productos', error);
        setLoading(false);
      });
  }, []);

  // Filtrar los datos de los productos
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Manejar la selección de un producto
  const handleRowClick = (product) => {
    if (selectedProductId === product.id) {
      setSelectedProductId(null); // Deseleccionar producto
      onProductSelect(null); // Notificar al componente principal
    } else {
      setSelectedProductId(product.id); // Seleccionar producto
      onProductSelect(product); // Notificar al componente principal
    }
  };

  // Definir las columnas del DataGrid
  const columns = [
    {
      field: 'imagen',
      headerName: 'Imagen',
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.imagen}
          alt={params.row.nombre}
          style={{ maxHeight: 75, maxWidth: 75, objectFit: 'contain' }}
        />
      ),
    },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 3 },
    { field: 'precioUnitario', headerName: 'Precio Unitario', flex: 1 },
    { field: 'calificacion', headerName: 'Calificación', flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
      <TextField
        label="Buscar producto..."
        variant="outlined"
        fullWidth
        sx={{ maxWidth: 800 }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

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
        <Box sx={{ minWidth: 800 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            loading={loading}
            getRowId={(row) => row.id}
            onRowClick={(params) => handleRowClick(params.row)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDataTable;
