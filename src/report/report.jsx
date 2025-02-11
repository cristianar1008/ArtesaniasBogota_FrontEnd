import '../Admin/Admin-head/head_admin.css';
import Footer from '../footer/footer';
import HeadAdmin from '../Admin/Admin-head/head_admin';
import { useState, useEffect } from 'react';

function Report() {
  const [formData, setFormData] = useState({
    puntoVenta: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [puntosVenta, setPuntosVenta] = useState([]);

  useEffect(() => {
    const fetchPuntosVenta = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        setMessage('Error: No se encontró el token de autenticación.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('https://artesanias-bogota-inventario-module.onrender.com/api/inventario/puntos-venta/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al cargar los puntos de venta');

        const data = await response.json();
        setPuntosVenta(data);
      } catch (error) {
        console.error(error);
        setMessage('Error al cargar los puntos de venta');
      }
    };

    fetchPuntosVenta();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = getTokenFromCookies();
    if (!token) {
      setMessage('Error: No se encontró el token de autenticación.');
      setLoading(false);
      return;
    }

    const requestData = {
      puntosVentaIds: [parseInt(formData.puntoVenta)],
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin
    };

    try {
      const response = await fetch('https://artesanias-bogota.onrender.com/api/reportes/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Error al generar el reporte');
      }

      const fileName = await response.text(); // Obtener el nombre del archivo en crudo
      const downloadUrl = `https://artesanias-bogota.onrender.com/api/reportes/descargar-reporte?nombreArchivo=${fileName}`;
      
      const downloadResponse = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!downloadResponse.ok) {
        throw new Error('Error al descargar el reporte');
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMessage('Reporte generado y descargado correctamente.');
    } catch (error) {
      setMessage('Error al conectar con el servidor.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <HeadAdmin />

      <div className="report-container">
        <h2>Generar Reporte</h2>
        <form onSubmit={handleSubmit} className="report-form">
          <label>
            Seleccione el punto de venta:
            <br />
            <select name="puntoVenta" value={formData.puntoVenta} onChange={handleChange} required>
              <option value="">-- Seleccione --</option>
              {puntosVenta.map((punto) => (
                <option key={punto.id} value={punto.id}>
                  {punto.nombre.trim()}
                </option>
              ))}
            </select>
          </label>

          <label>
            Fecha Inicio:
            <br />
            <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required />
          </label>

          <label>
            Fecha Fin:
            <br />
            <input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} required />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Generando...' : 'Generar Reporte'}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <footer className="footer-footer">
        <Footer />
      </footer>
      <style>
        {`
          .report-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .report-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          label {
            font-weight: bold;
            display: flex;
            flex-direction: column;
            text-align: left;
          }

          select, input {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          button {
            background-color: #f1ac13;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: rgb(243, 191, 81);
          }

          button:disabled {
            background-color: gray;
            cursor: not-allowed;
          }

          .message {
            margin-top: 10px;
            font-weight: bold;
          }
        `}
      </style>

      
    </>
  );
}

export default Report;

