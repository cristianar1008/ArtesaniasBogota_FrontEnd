import Swal from 'sweetalert2';
import { useState } from 'react';
import ProductDataTable from './stock-datatable';

function StockIndex() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Usuario seleccionado

  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;

  // Mostrar modal de producto (registro)
  const showProductModal = () => {
    Swal.fire({
      title: 'Registrar producto',
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del producto" required />
        <textarea 
          id="descripcion" 
          class="swal2-input" 
          placeholder="Descripción del producto" 
          required 
          style="width: 75%; height: 100px;"
        ></textarea>
        <input type="number" id="precioUnitario" class="swal2-input" placeholder="Precio unitario" required />
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const precioUnitario = Swal.getPopup().querySelector('#precioUnitario').value;

        if (!nombre || !descripcion || !precioUnitario) {
          Swal.showValidationMessage('Por favor, completa todos los campos');
          return false;
        }

        return new Promise((resolve) => {
          resolve({
            nombre,
            descripcion,
            precioUnitario: parseInt(precioUnitario),
            calificacion: Math.floor(Math.random() * 4) + 2,
            imagen: "https://xxxx.com", // Imagen por defecto
            idCategoriaProducto: 1,
            colorProductosId: 1,
            oficioId: 1,
            coleccionProductosId: 1,
            artistasProductosId: 1,
          });
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const productData = result.value;
        handleRegister(productData);
      }
    });
  };

  // Registrar producto
  const handleRegister = (productData) => {
    fetch(`${apiUrl_artesanias}/api/productos/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en el registro');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire('Éxito', 'Producto registrado correctamente', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo registrar el producto', 'error');
      });
  };

  return (
    <div className='container-body'>
      <center><h1>Gestión de Inventario</h1></center>
      <div>
        <button className='buttonRegister' onClick={showProductModal}>
          Registrar Producto
        </button>
        <ProductDataTable onUserSelect={setSelectedProduct}></ProductDataTable>
      </div>
    </div>
  );
}

export default StockIndex;
