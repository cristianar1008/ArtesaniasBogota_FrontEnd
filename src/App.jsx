import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import DropDownMenu from './dropdown-menu/dropdownMenu';
import Card from './card/card';
import Footer from './footer/footer';
import Head from './head/head';

function App() {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los ids de los productos en el carrito

  // Llamada a la API para obtener los productos
  useEffect(() => {
    fetch('http://localhost:8081/api/productos/productos')
      .then((response) => response.json())
      .then((data) => {
        // Transformamos los datos de la API para que coincidan con la estructura esperada
        const productosTransformados = data.map((producto) => ({
          id: producto.id,
          titulo: producto.nombre,
          categoria: 'Categoría 1',  // Puedes cambiar esto si tienes categorías en la respuesta
          descripcion: producto.descripcion,
          precio: `$${(producto.precioUnitario)}`, // Convertir de centavos a formato decimal
          imagen: producto.imagen,
          calificacion: producto.calificacion,
        }));
        setProductos(productosTransformados);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []); // El segundo parámetro vacío asegura que solo se ejecute una vez al montar el componente

  // Función para manejar el id del producto agregado al carrito
  const handleAddToCart = (id) => {
    console.log(id)
    setCarrito((prevCarrito) => [...prevCarrito, id]); // Añade el id del producto al carrito
  };

  return (
    <>
      <Head carrito={carrito}/>
      <div className="container">
        <div>
          <DropDownMenu />
        </div>
        <div className="cards">
          <div className="cards-grid">
            {productos.map((producto) => (
              <Card
                key={producto.id}
                id={producto.id} // Pasamos el id al componente Card
                titulo={producto.titulo}
                categoria={producto.categoria}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
                calificacion={producto.calificacion}
                onAddToCart={handleAddToCart} // Pasamos la función que maneja el id
              />
            ))}
          </div>
        </div>
      </div>
      <footer className="footer-footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
