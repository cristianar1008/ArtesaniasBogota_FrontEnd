import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import productoPrueba from './assets/productoPrueba.jpg'
import icon from './assets/icono.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import UserIn from './userIn/userIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="navbar">
      <div className="social-icons">
          <FontAwesomeIcon icon={faFacebookF} className="icon-spacing" />
          <FontAwesomeIcon icon={faInstagram} className="icon-spacing" />
      </div>
      <div className="user-icons">
          <UserIn></UserIn>
      </div>
    </div>

    <div class="header">
      <div class="logo">
        <img src={logo} alt="Logo" class='logo-image' />
      </div>
      <div class="search-bar-div">
        <div class="search-bar">
            <i class="fas fa-bars"></i>
            <input type="text" placeholder="Buscar..." />
            <i class="fas fa-search"></i>
        </div>
        
      </div>
      
    </div>

    <div class="separator">
      </div>

    <div class="container">
      <div class="dropdown-menu">
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
        <div class="menu-item">Menu item</div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-image">
            <img src={productoPrueba} alt="Imagen del producto" />
          </div>
          <div class="card-content">
            <h3>Título</h3>
            <p class="category">Categoría</p>
            <p class="description">Descripción</p>
            <div class="rating">
              <span class="star filled">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <button class="add-button">Agregar +</button>
          </div>
        </div>
      </div>
      </div>

      <footer class="footer-footer">
          <div class="footer-content-footer">
              <div class="social-icons-footer">
                  <FontAwesomeIcon icon={faFacebookF} className="icon-spacing-footer" />
                  <FontAwesomeIcon icon={faInstagram} className="icon-spacing-footer" />
              </div>
              <div class="logo-footer">
                  <img src={icon} alt="Logo" class="logo-image-footer" />
              </div>
          </div>
      </footer>




    </>
  )
}

export default App
