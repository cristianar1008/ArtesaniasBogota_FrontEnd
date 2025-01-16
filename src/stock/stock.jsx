import '../Admin/Admin-head/head_admin.css'
import logo from '../assets/logo.png'
import Footer from '../footer/footer';
import AdminUserIndex from '../Admin/Admin-user-index/Admin-user-index';
import HeadAdmin from '../Admin/Admin-head/head_admin';
import StockIndex from './stock-index/stock-index';



function Stock() {
 
  return (
    <> 
    <HeadAdmin ></HeadAdmin>
    
    
    <StockIndex></StockIndex>
    

    <footer class="footer-footer">
        <Footer></Footer>
    </footer>
    </>
  )
}

export default Stock