import './head_admin.css'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import UserIn_Admin from '../Admin-userIn/userIn-Admin';



function HeadAdmin() {
 
  return (
    <> 
      <div className="navbar">
      <div className="social-icons">
          <FontAwesomeIcon icon={faFacebookF} className="icon-spacing" />
          <FontAwesomeIcon icon={faInstagram} className="icon-spacing" />

      </div>
      <div className="user-icons">
          <UserIn_Admin></UserIn_Admin>
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

export default HeadAdmin