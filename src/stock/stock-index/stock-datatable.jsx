import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Button, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDataTable = ({ onProductSelect }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;

  // Obtener lista de productos
  useEffect(() => {
    axios.get(`${apiUrl_artesanias}/api/productos/productos`)
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

  // Manejar el cambio del checkbox
  const handleCheckboxChange = (product) => {
    if (selectedProductId === product.id) {
      setSelectedProductId(null);
      onProductSelect(null);
    } else {
      setSelectedProductId(product.id);
      onProductSelect(product);
    }
  };

  // Mostrar modal de producto (modificación)
  const showProductModal = () => {
    const selectedProduct = rows.find((row) => row.id === selectedProductId);
    if (!selectedProduct) {
      Swal.fire('Error', 'No hay un producto seleccionado', 'error');
      return;
    }

    Swal.fire({
      title: 'Modificar producto',
      html: `
        <input type="text" id="id" class="swal2-input" placeholder="ID del producto" value="${selectedProduct?.id || ''}" readonly />
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del producto" value="${selectedProduct?.nombre || ''}" required />
        <textarea 
          id="descripcion" 
          class="swal2-input" 
          placeholder="Descripción del producto" 
          required 
          style="width: 75%; height: 100px;"
        >${selectedProduct?.descripcion || ''}</textarea>
        <input type="number" id="precioUnitario" class="swal2-input" placeholder="Precio unitario" value="${selectedProduct?.precioUnitario.replace('$', '').replace(',', '') || ''}" required />
        <input type="number" id="calificacion" class="swal2-input" placeholder="Cantidad" value="${selectedProduct?.calificacion || ''}" required />
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Modificar',
      preConfirm: () => {
        const id = Swal.getPopup().querySelector('#id').value;
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const precioUnitario = parseFloat(Swal.getPopup().querySelector('#precioUnitario').value);
        const calificacion = parseInt(Swal.getPopup().querySelector('#calificacion').value);

        if (!nombre || !descripcion || isNaN(precioUnitario) || isNaN(calificacion)) {
          Swal.showValidationMessage('Todos los campos son obligatorios y deben tener valores válidos.');
          return false;
        }

        return { id, nombre, descripcion, precioUnitario, calificacion };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = result.value;
        handleUpdate(updatedProduct, selectedProduct.id); // Modificar producto existente
      }
    });
  };

  // Mostrar detalles del producto
  const handleViewDetails = (product) => {
    Swal.fire({
      title: 'Detalles del Producto',
      html: `
        <p><strong>ID:</strong> ${product.id}</p>
        <p><strong>Nombre:</strong> ${product.nombre}</p>
        <p><strong>Descripción:</strong> ${product.descripcion}</p>
        <p><strong>Precio Unitario:</strong> ${product.precioUnitario}</p>
        <p><strong>Calificación:</strong> ${product.calificacion}</p>
        <img src="${product.imagen}" alt="Imagen del producto" style="max-width: 100%; height: auto; margin-top: 15px;" />
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };
  

  // Modificar producto
  const handleUpdate = (productData) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Los cambios realizados en el producto serán guardados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${apiUrl_artesanias}/api/inventario/actualizar-inventario/producto-puntoventa`,
            productData // Cuerpo de la solicitud con los datos del producto
          )
          .then(() => {
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === productData.id
                  ? { ...row, ...productData, precioUnitario: `$${productData.precioUnitario.toLocaleString()}` }
                  : row
              )
            );
            Swal.fire('Éxito', 'Producto modificado correctamente.', 'success');
          })
          .catch((error) => {
            console.error('Error al modificar el producto:', error.response?.data || error.message);
            Swal.fire('Error', 'No se pudo modificar el producto.', 'error');
          });
      }
    });
  };
  
  const getToken = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        return decodeURIComponent(value);
      }
    }
    return null;
  };
  
  // Eliminar producto
  const handleDelete = (facturaId, itemId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El producto será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = getToken(); // Obtén el token desde las cookies

  if (!token) {
    Swal.fire("Error", "No se encontró el token de autenticación.", "error");
    return;
  }

  try {
    const response = fetch(`${apiUrl_artesanias}/api/facturas/remove-item/${facturaId}/${itemId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Actualiza los datos del DataGrid después de eliminar
        setRows((prevRows) => prevRows.filter((row) => row.id !== itemId));
        setSelectedProductId(null); // Deselecciona cualquier producto
        Swal.fire("Eliminado", "Producto eliminado correctamente.", "success");
      } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
      }
    });
  };
  
  

  // Definir las columnas del DataGrid
  const columns = [
    {
      field: 'checkbox',
      headerName: 'Modificar',
      flex: 0.5,
      renderCell: (params) => (
        <Checkbox
          checked={selectedProductId === params.row.id}
          onChange={() => handleCheckboxChange(params.row)}
        />
      ),
    },
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
    {
      field: 'detalles',
      headerName: 'Detalles',
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleViewDetails(params.row)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar Producto',
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDelete(params.row.id, params.row.id)} // FacturaId e ItemId desde los datos
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    
    
    
  ];

  return (
    <Box>
   <Box sx={{ marginLeft: 30, marginTop: -6.3 }}>
  <Button
    variant="contained"
    className="buttonEdit"
    onClick={showProductModal}
    disabled={!selectedProductId}
    sx={{
      backgroundColor: "#f1ac13", // Amarillo anaranjado
      color: "white",
      "&:hover": { backgroundColor: "#d99210" }, // Un tono más oscuro al pasar el mouse
      "&:disabled": { backgroundColor: "#f7c66a", color: "#fff" } // Color más claro cuando está deshabilitado
    }}
  >
    Modificar
  </Button>
</Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: 2 }}>
      

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
            onRowClick={(params) => setSelectedProductId(params.row.id)}
          />
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default ProductDataTable;
