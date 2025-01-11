import './home.css'
import { useState } from 'react';
import Footer from '../footer/footer'
import Head from '../head/head';
import HeadAdmin from '../Admin/Admin-head/head_admin';
import AdminUserIndex from '../Admin/Admin-user-index/Admin-user-index';

function Home() {

  
  
  return (
    <>
    <HeadAdmin ></HeadAdmin>
    
    

     <AdminUserIndex></AdminUserIndex>

    <footer class="footer-footer">
      <Footer></Footer>
    </footer>
    </>
  )
}

export default Home