import React, { useEffect, useState } from "react";
import "./Bill.css";
import Footer from "../footer/footer";
import CardShop from "../card-shop/card-shop";
import Swal from "sweetalert2";

// Función para leer cookies
const getCookies = () => {
  const cookies = document.cookie.split("; ").reduce((acc, current) => {
    const [key, value] = current.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
  return cookies;
};

// Función para guardar una cookie
const setCookie = (name, value) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 30 * 60 * 1000); // Expiración de 30 minutos
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const Bill = () => {
  const [userInfo, setUserInfo] = useState({});
  const [carrito, setCarrito] = useState([]);

  // Cargar datos del usuario y carrito desde las cookies
  useEffect(() => {
    const cookies = getCookies();
    setUserInfo(cookies);

    // Leer y parsear el carrito desde la cookie
    if (cookies.carrito) {
      try {
        const carritoGuardado = JSON.parse(cookies.carrito);
        setCarrito(carritoGuardado);
      } catch (error) {
        console.error("Error al parsear la cookie del carrito:", error);
      }
    }
  }, []);

  // Función para manejar la creación de la factura
  const handleCreateInvoice = async () => {
    const documentoUsuario = userInfo.documento;

    if (!documentoUsuario) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe iniciar sesión primero",
      });
      return;
    }

    try {
      // Crear factura
      const response = await fetch("http://localhost:8081/api/facturas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentoUsuario: documentoUsuario,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Guardar el ID de la factura en una cookie
        const facturaId = responseData.id;
        setCookie("facturaId", facturaId);

        Swal.fire({
          icon: "success",
          title: "Factura Creada",
          text: `La factura ha sido registrada correctamente. ID de factura: ${facturaId}`,
        });

        // Agregar productos a la factura
        await handleAddProductsToInvoice(facturaId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `No se pudo registrar la factura. Detalles: ${JSON.stringify(responseData)}`,
        });
      }
    } catch (error) {
      console.error("Error al crear la factura:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar la factura.",
      });
    }
  };

  const handleAddProductsToInvoice = async (facturaId) => {
    try {
      const productosFactura = carrito.map((producto) => ({
        idPuntoVenta: 1, // Cambiar según la lógica del negocio
        idFactura: facturaId,
        idProducto: producto.id,
        cantidad: producto.cantidad,
      }));
      console.log("productosFactura")
      console.log(productosFactura)
  
      const response = await fetch("http://localhost:8081/api/facturas/agregar-productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productosFactura),
      });
  
      // Validar el código de estado de la respuesta
      if (response.status === 200) {
       
        Swal.fire({
          icon: "success",
          title: "Productos Agregados",
          text: "Los productos se han registrado correctamente en la factura.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al Agregar Productos",
          text: `No se pudieron registrar los productos. Código de estado: ${response.status}`,
        });
      }
    } catch (error) {
      console.error("Error al agregar productos a la factura:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar los productos en la factura.",
      });
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

  return (
    <>
      <div className="checkout-container">
        {/* Panel principal */}
        <div className="main-panel">
          <div className="stepper">
            <div className="step active">1. Información personal</div>
            <div className="step">2. Pago</div>
          </div>

          <div className="user-info-section">
            <h2>Información personal</h2>
            {userInfo && (
              <div className="user-details">
                <div className="user-detail-row">
                  <span className="detail-label">Nombre:</span>
                  <span className="detail-value">
                    {userInfo.primerNombre} {userInfo.segundoNombre || ""}{" "}
                    {userInfo.primerApellido} {userInfo.segundoApellido}
                  </span>
                </div>
                <div className="user-detail-row">
                  <span className="detail-label">Correo:</span>
                  <span className="detail-value">{userInfo.email}</span>
                </div>
                <div className="user-detail-row">
                  <span className="detail-label">Teléfono:</span>
                  <span className="detail-value">{userInfo.telefono}</span>
                </div>
                <div className="user-detail-row">
                  <span className="detail-label">Dirección:</span>
                  <span className="detail-value">{userInfo.direccion}</span>
                </div>
                <div className="user-detail-row">
                  <span className="detail-label">Documento:</span>
                  <span className="detail-value">{userInfo.documento}</span>
                </div>
              </div>
            )}
            <button className="continue-shopping-button" onClick={handleCreateInvoice}>
              Continuar compra
            </button>
          </div>
        </div>

        {/* Barra lateral del carrito */}
        <div className={`sidebar-cart active`}>
          <center>
            <h3>Mis productos</h3>
          </center>
          <CardShop
            carrito={carrito}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>

      <footer className="footer-footer">
        <Footer />
      </footer>
    </>
  );
};

export default Bill;

