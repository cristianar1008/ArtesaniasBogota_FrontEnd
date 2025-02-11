import Swal from 'sweetalert2';
import { useState } from 'react';
import ProductDataTable from './stock-datatable';

function StockIndex() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado

  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;

  // Mostrar modal para registrar producto
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
        <input type="number" id="calificacion" class="swal2-input" placeholder="Calificación" required />
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const precioUnitario = parseFloat(Swal.getPopup().querySelector('#precioUnitario').value);
        const calificacion = parseInt(Swal.getPopup().querySelector('#calificacion').value);

        if (!nombre || !descripcion || isNaN(precioUnitario) || isNaN(calificacion)) {
          Swal.showValidationMessage('Todos los campos son obligatorios y deben tener valores válidos.');
          return false;
        }

        return { nombre, descripcion, precioUnitario, calificacion };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newProduct = result.value;
        handleRegister(newProduct); // Llama a la función de registro
      }
    });
  };

  // Función para registrar producto
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
    <div className="container-body">
      <center><h1>Gestión de Inventario</h1></center>
      <div className="buttons-container">
        <button className="buttonRegister" onClick={showProductModal}>
          Registrar Producto
        </button>
        <button
          className="buttonEdit"
          onClick={() => selectedProduct && showModifyProductModal()}  // Ejecuta la modificación
          disabled={!selectedProduct}  // Deshabilitar si no hay un producto seleccionado
        >
          Modificar Producto
        </button>
      </div>

      <ProductDataTable
        onUserSelect={(product) => setSelectedProduct(product)} // Se pasa el producto seleccionado
      />
    </div>
  );
}

export default StockIndex;
