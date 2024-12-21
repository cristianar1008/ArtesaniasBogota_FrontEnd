import './head.css'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import UserIn from '../userIn/userIn';


function Head({ carrito, handleUpdateQuantity, handleRemoveItem }) {
  console.log(carrito)
  return (
    <> 
      <div className="navbar">
      <div className="social-icons">
          <FontAwesomeIcon icon={faFacebookF} className="icon-spacing" />
          <FontAwesomeIcon icon={faInstagram} className="icon-spacing" />
      </div>
      <div className="user-icons">
      <UserIn
          carrito={carrito}
          handleUpdateQuantity={handleUpdateQuantity}
          handleRemoveItem={handleRemoveItem}
        />
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
    </>
  )
}

export default Head