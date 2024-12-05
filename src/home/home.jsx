import './home.css'
import { useState } from 'react';
import Footer from '../footer/footer'
import Head from '../head/head';
import HeadAdmin from '../Admin/Admin-head/head_admin';
import AdminUserIndex from '../Admin/Admin-user-index/Admin-user-index';

function Home() {

  // Estado para controlar si el componente debe ser visible
  const [isVisibleWelcome, setIsVisibleWelcome] = useState(true);
  const [isVisibleUserIndex, setIsVisibleUserIndex] = useState(false);

  // Función para cambiar la visibilidad
  const toggleVisibilityWelcome = () => {
    setIsVisibleWelcome(!isVisibleWelcome);
    setIsVisibleUserIndex(!isVisibleUserIndex);
  };
  
  return (
    <>
    <HeadAdmin toggleVisibilityWelcome={toggleVisibilityWelcome} ></HeadAdmin>
    
    {isVisibleWelcome && <div className='container-body'>
        <center><h1>¡Bienvenido!</h1></center>
    </div>}

    {isVisibleUserIndex && <AdminUserIndex></AdminUserIndex>}

    <footer class="footer-footer">
      <Footer></Footer>
    </footer>
    </>
  )
}

export default Home