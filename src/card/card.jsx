import './card.css';
import productoPrueba from '../assets/productoPrueba.jpg';

function Card() {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={productoPrueba} alt="Imagen del producto" />
        </div>
        <div className="card-content">
          <h3>Título</h3>
          <p className="category">Categoría</p>
          <p className="description">Descripción</p>
          <div className="rating-button">
            <div className="rating">
              <span className="star filled">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <button className="add-button">Agregar +</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
