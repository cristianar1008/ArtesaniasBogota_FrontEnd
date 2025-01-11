import './card.css';
import axios from "axios";
function Card({ id, titulo, categoria, descripcion, precio, imagen, calificacion, onAddToCart }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart(id); // Llamamos la función con el id del producto
  };


  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={imagen} alt={`Imagen de ${titulo}`} />
        </div>
        <div className="card-content">
          <h3>{titulo}</h3>
          <p className="category">{categoria}</p>
          <p className="description">{descripcion}</p>
          <p className="price">{precio}</p>
          <div className="rating-button">
            <div className="rating">
              {renderStars(calificacion)}
            </div>
            <button className="add-button" onClick={handleAddToCart}>Agregar +</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
