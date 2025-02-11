import Swal from 'sweetalert2';
import { useState } from 'react';
import ProductDataTable from './stock-datatable';
import Footer from '../../footer/footer';

function StockIndex() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado

  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;

  // Mostrar modal para registrar producto
  const showProductModal = () => {
   
  
    Swal.fire({
      title: 'Registrar producto',
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del producto"/>
        <textarea 
          id="descripcion" 
          class="swal2-input" 
          placeholder="Descripción del producto" 
          required 
          style="width: 75%; height: 100px;"
        ></textarea>
        <input type="number" id="precioUnitario" class="swal2-input" placeholder="Precio unitario"/>
        <input type="number" id="calificacion" class="swal2-input" placeholder="Calificación"  />
      `,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Registrar',
      customClass: {
        title: 'swal-title',
        confirmButton: 'btn-confirm',
      },
      preConfirm: () => {
       
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const precioUnitario = parseFloat(Swal.getPopup().querySelector('#precioUnitario').value);
        const calificacion = parseInt(Swal.getPopup().querySelector('#calificacion').value);
  
        if (!nombre || !descripcion || isNaN(precioUnitario) || isNaN(calificacion)) {
          Swal.showValidationMessage('Todos los campos son obligatorios y deben tener valores válidos.');
          return false;
        }
  
        return {nombre, descripcion, precioUnitario, calificacion };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = result.value;
        handleRegister(updatedProduct); // Llama a la función de actualización
      }
    });
  };
  

  // Mostrar modal para modificar producto
  const showModifyProductModal = (product) => {
    Swal.fire({
      title: 'Modificar producto',
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del producto" value="${product.nombre}" required />
        <textarea 
          id="descripcion" 
          class="swal2-input" 
          placeholder="Descripción del producto" 
          required 
          style="width: 75%; height: 100px;"
        >${product.descripcion}</textarea>
        <input type="number" id="precioUnitario" class="swal2-input" placeholder="Precio unitario" value="${product.precioUnitario}" required />
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Modificar',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const precioUnitario = Swal.getPopup().querySelector('#precioUnitario').value;

        if (!nombre || !descripcion || !precioUnitario) {
          Swal.showValidationMessage('Por favor, completa todos los campos');
          return false;
        }

        return {
          ...product,
          nombre,
          descripcion,
          precioUnitario: parseInt(precioUnitario),
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = result.value;
        handleModify(updatedProduct);
      }
    });
  };

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  // Registrar producto
  const handleRegister = (productData) => {
    const token = getTokenFromCookies();
        if (!token) {
          setMessage('Error: No se encontró el token de autenticación.');
          setLoading(false);
          return;
        }
    console.log(productData)
    fetch(`${apiUrl_artesanias}/api/productos/create`, {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${token}`,
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

  // Modificar producto
  const handleModify = (productData) => {
    fetch(`${apiUrl_artesanias}/api/productos/update/${productData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la modificación');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire('Éxito', 'Producto modificado correctamente', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo modificar el producto', 'error');
      });
  };

  return (
    <div className='container-body'>
      <center><h1>Gestión de Inventario</h1></center>
      <div>
        <button className='buttonRegister' onClick={showProductModal}>
          Registrar Producto
        </button>
        
       
        <ProductDataTable 
          onUserSelect={(product) => {
            setSelectedProduct(product);
            showModifyProductModal(product);
          }}
        ></ProductDataTable>
        
      </div>
      <footer class="footer-footer">
        <Footer></Footer>
    </footer>
    </div>
  );
}

export default StockIndex;
