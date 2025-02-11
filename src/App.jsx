// import React, { useState, useEffect } from "react";
// import "./App.css";
// import "./index.css";
// import DropDownMenu from "./dropdown-menu/dropdownMenu";
// import Card from "./card/card";
// import Footer from "./footer/footer";
// import Head from "./head/head";

// function App() {
//   const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;
//   const [productos, setProductos] = useState([]);
//   const [carrito, setCarrito] = useState([]);

//   useEffect(() => {
//     fetch(apiUrl_artesanias + "/api/productos/productos")
//       .then((response) => response.json())
//       .then((data) => {
//         const productosTransformados = data.map((producto) => ({
//           id: producto.id,
//           titulo: producto.nombre,
//           categoria: "Categoría 1",
//           descripcion: producto.descripcion,
//           precio: producto.precioUnitario,
//           imagen: producto.imagen,
//           calificacion: producto.calificacion,
//         }));
//         setProductos(productosTransformados);
//       })
//       .catch((error) => console.error("Error al obtener los productos:", error));
//   }, []);

//   const handleAddToCart = async (id) => {
//     try {
//       const response = await fetch(`${apiUrl_artesanias}/api/productos/producto/${id}`);
//       const producto = await response.json();

//       setCarrito((prevCarrito) => {
//         const productoExistente = prevCarrito.find((item) => item.id === id);

//         if (productoExistente) {
//           return prevCarrito.map((item) =>
//             item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
//           );
//         }

//         return [...prevCarrito, { ...producto, cantidad: 1 }];
//       });
//     } catch (error) {
//       console.error("Error al agregar al carrito:", error);
//     }
//   };

//   // Agrupar los productos en filas de 4
//   const chunkArray = (arr, size) => {
//     return arr.reduce(
//       (acc, _, i) =>
//         (i % size ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc),
//       []
//     );
//   };

//   const productosPorFila = chunkArray(productos, 4);

//   return (
//     <>
//       <Head carrito={carrito} />
//       <table className="layout-table">
//         <tbody>
//           <tr>
//             {/* Menú lateral */}
//             <td className="menu-column">
              
//             </td>

//             {/* Productos */}
//             <td className="products-column">
//               <table className="productos-table">
//                 <tbody>
//                   {productosPorFila.map((fila, index) => (
//                     <tr key={index}>
//                       {fila.map((producto) => (
//                         <td key={producto.id} className="producto-celda">
//                           <Card
//                             {...producto}
//                             onAddToCart={() => handleAddToCart(producto.id)}
//                           />
//                         </td>
//                       ))}
//                       {Array(4 - fila.length)
//                         .fill()
//                         .map((_, i) => (
//                           <td key={`empty-${index}-${i}`} className="producto-celda vacia"></td>
//                         ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <footer className="footer-footer">
//         <Footer />
//       </footer>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import DropDownMenu from "./dropdown-menu/dropdownMenu";
import Card from "./card/card";
import Footer from "./footer/footer";
import Head from "./head/head";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago('APP_USR-8cd121fa-5fc8-4570-8acb-f3a7d9430bae',{ locale: 'es-CO' });

// Funciones para manejar cookies
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const cookies = document.cookie.split("; ").reduce((acc, current) => {
    const [key, value] = current.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
  return cookies[name] || null;
};

function App() {

  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Cargar el carrito desde la cookie al iniciar la aplicación
  useEffect(() => {
    const carritoGuardado = getCookie("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar el carrito en una cookie cada vez que cambie
  useEffect(() => {
    setCookie("carrito", JSON.stringify(carrito), 7); // Guardar por 7 días
  }, [carrito]);

  // Llamada a la API para obtener los productos
  useEffect(() => {
    fetch(apiUrl_artesanias+'/api/productos/productos')
      .then((response) => response.json())
      .then((data) => {
        const productosTransformados = data.map((producto) => ({
          id: producto.id,
          titulo: producto.nombre,
          categoria: "Categoría 1",
          descripcion: producto.descripcion,
          precio: `$${producto.precioUnitario}`,
          imagen: producto.imagen,
          calificacion: producto.calificacion,
        }));
        setProductos(productosTransformados);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const handleAddToCart = async (id) => {
    try {
      const response = await fetch(`${apiUrl_artesanias}/api/productos/producto/${id}`);
      const producto = await response.json();

      setCarrito((prevCarrito) => {
        const productoExistente = prevCarrito.find((item) => item.id === id);

        if (productoExistente) {
          return prevCarrito.map((item) =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
          );
        }

        return [...prevCarrito, { ...producto, cantidad: 1 }];
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const handleUpdateQuantity = (id, nuevaCantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };
   // Agrupar los productos en filas de 4
   const chunkArray = (arr, size) => {
    return arr.reduce(
      (acc, _, i) =>
        (i % size ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc),
      []
    );
  };
  const productosPorFila = chunkArray(productos, 4);
   
  return (
    <>
      <Head
        carrito={carrito}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />
      <table className="layout-table">
         <tbody>
           <tr>
            {/* Menú lateral */}
            <td className="menu-column">
              
            </td>   
      {/* Productos */}
      <td className="products-column">   
      <table className="productos-table">
        <tbody>    
        {productosPorFila.map((fila, index) => (
                    <tr key={index}>
                      {fila.map((producto) => (
                        <td key={producto.id} className="producto-celda">
                          <Card
                            {...producto}
                            onAddToCart={() => handleAddToCart(producto.id)}
                          />
                        </td>
                      ))}
                      {Array(4 - fila.length)
                        .fill()
                        .map((_, i) => (
                          <td key={`empty-${index}-${i}`} className="producto-celda vacia"></td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
        {/* <div className="cards">
          <div className="cards-grid">
            {productos.map((producto) => (
              <Card
                key={producto.id}
                id={producto.id}
                titulo={producto.titulo}
                categoria={producto.categoria}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
                calificacion={producto.calificacion}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div> */}
      
      <footer className="footer-footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;