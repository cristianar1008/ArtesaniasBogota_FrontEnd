import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="navbar">
        <div class="social-icons">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-instagram"></i>
        </div>
        <div class="user-icons">
            <i class="fas fa-user"></i>
            <i class="fas fa-shopping-cart"></i>
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
    <div>
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

    </div>


    </>
  )
}

export default App
