import './footer.css'
import icon from '../assets/icono.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';


function Footer() {
 
  return (
    <>
          <div class="footer-content-footer">
              <div class="social-icons-footer">
                  <FontAwesomeIcon icon={faFacebookF} className="icon-spacing-footer" />
                  <FontAwesomeIcon icon={faInstagram} className="icon-spacing-footer" />
              </div>
              <div class="logo-footer">
                  <img src={icon} alt="Logo" class="logo-image-footer" />
              </div>
          </div>
      
    </>
  )
}

export default Footer