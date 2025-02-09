import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import DropDownMenu from "./dropdown-menu/dropdownMenu";
import Card from "./card/card";
import Footer from "./footer/footer";
import Head from "./head/head";

function App() {
  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch(apiUrl_artesanias + "/api/productos/productos")
      .then((response) => response.json())
      .then((data) => {
        const productosTransformados = data.map((producto) => ({
          id: producto.id,
          titulo: producto.nombre,
          categoria: "Categoría 1",
          descripcion: producto.descripcion,
          precio: producto.precioUnitario,
          imagen: producto.imagen,
          calificacion: producto.calificacion,
        }));
        setProductos(productosTransformados);
      })
      .catch((error) => console.error("Error al obtener los productos:", error));
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
      <Head carrito={carrito} />
      <table className="layout-table">
        <tbody>
          <tr>
            {/* Menú lateral */}
            <td className="menu-column">
              <DropDownMenu />
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
      <footer className="footer-footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;

