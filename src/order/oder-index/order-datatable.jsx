import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';

const OrderDataTable = () => {
  const apiUrl_pedidos = 'https://artesanias-bogota-inventario-module.onrender.com/api/pedidos/list';
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      console.error('No se encontró el token de autenticación');
      setLoading(false);
      return;
    }

    fetch(apiUrl_pedidos, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los pedidos:', error);
        setLoading(false);
      });
  }, []);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'idFactura', headerName: 'ID Factura', flex: 1 },
    { field: 'idPuntosVenta', headerName: 'ID Puntos Venta', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'latEntrega', headerName: 'Latitud Entrega', flex: 1 },
    { field: 'longEntrega', headerName: 'Longitud Entrega', flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
      <TextField
        label="Buscar pedido..."
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
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDataTable;
