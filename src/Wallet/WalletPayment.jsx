import React, { useEffect, useState } from 'react';
import { Wallet } from '@mercadopago/sdk-react';

const WalletPayment = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // Llama al backend para generar la preferencia
    fetch('https://api.mercadopago.com/checkout/preferences/2079614828-d15159b1-a463-4006-9e91-5c8e92df2420', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'Producto de ejemplo',
        cantidad: 1,
        precio: 100.0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPreferenceId(data.preferenceId); // Ajusta según cómo tu backend devuelva la preferencia
      })
      .catch((error) => console.error('Error al generar preferencia:', error));
  }, []);

  return (
    <div>
      <h2>Finalizar Compra</h2>
      {preferenceId ? (
        <Wallet
          initialization={{ preferenceId }}
          customization={{
            texts: {
              valueProp: 'Paga de manera segura con Mercado Pago',
            },
          }}
        />
      ) : (
        <p>Cargando opciones de pago...</p>
      )}
    </div>
  );
};

export default WalletPayment;
