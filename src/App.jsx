import './App.css'
import DropDownMenu from './dropdown-menu/dropdownMenu';
import Card from './card/card';
import Footer from './footer/footer'
import Head from './head/head';

function App() {
 
  return (
    <>
    <Head></Head>
    <div class="container">
      <DropDownMenu></DropDownMenu>
      <div class="cards">
        <Card></Card>
      </div>
    </div>

    <footer class="footer-footer">
      <Footer></Footer>
    </footer>
    </>
  )
}

export default App
