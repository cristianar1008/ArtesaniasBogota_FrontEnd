import React, { useEffect, useState } from 'react';
import { Wallet } from '@mercadopago/sdk-react';



const WalletPayment = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const apiUrl_artesanias = import.meta.env.VITE_APP_API_URL_ARTESANIAS;


  useEffect(() => {
    // Función para obtener el valor de una cookie
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const facturaId = getCookie('facturaId'); // Obtén la cookie "facturaId"

    if (!facturaId) {
      console.error('No se encontró la cookie facturaId');
      return;
    }

    // Llama al backend para generar la preferencia usando el id de la factura
    fetch(`${apiUrl_artesanias}/api/pagos/crear-preferencia/by-factura/${facturaId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud al backend');
        }
        return response.text(); // Cambia a .text() porque la respuesta no es JSON
      })
      .then((data) => {
        console.log('Preferencia obtenida:', data); // Verifica la respuesta
        setPreferenceId(data); // Almacena directamente el texto como el preferenceId
      })
      .catch((error) => {
        console.error('Error al generar preferencia:', error);
      });
  }, []);

  return (
    <div>
      {preferenceId ? (
        <Wallet
          initialization={{
            preferenceId: preferenceId,
          }}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default WalletPayment;