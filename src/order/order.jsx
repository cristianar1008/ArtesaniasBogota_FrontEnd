import '../Admin/Admin-head/head_admin.css'

import Footer from '../footer/footer';

import HeadAdmin from '../Admin/Admin-head/head_admin';
import OrderDataTable from './oder-index/order-datatable';
// import StockIndex from './stock-index/stock-index';



function Order() {
 
  return (
    <> 
    <HeadAdmin ></HeadAdmin>
    <center><h1>Pedidos</h1></center>
    
    <OrderDataTable/>
    

    <footer class="footer-footer">
        <Footer></Footer>
    </footer>
    </>
  )
}

export default Order