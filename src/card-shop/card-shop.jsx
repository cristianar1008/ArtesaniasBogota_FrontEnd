import './card-shop.css';

function CardShop({ cartItems, onRemoveItem }) {
  return (
    <>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">${item.price.toLocaleString()}</p>
            </div>
            <button
              className="cart-item-remove"
              onClick={() => onRemoveItem(item.id)}
            >
              ✖
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default CardShop;
