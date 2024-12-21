import './card-shop.css';

function CardShop({ carrito, onRemoveItem, onUpdateQuantity }) {
  // Calcula el total de productos en el carrito (suma de las cantidades)
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Calcula el precio total de los productos en el carrito
  const precioTotal = carrito.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0);

  return (
    <div className="cart-container">
      {/* Resumen de compra en la parte superior derecha */}
      <div className="cart-summary">
        <h5>Total de productos: {totalProductos}</h5>
        <h5>
          Precio total: ${precioTotal.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
        </h5>
      </div>
      <hr></hr>

      {carrito.length === 0 ? (
        <center>
          <p className="cart-empty">No hay productos en el carrito.</p>
        </center>
      ) : (
        carrito.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.nombre}</h4>
              <p className="cart-item-price">
                Precio unitario: ${item.precioUnitario.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
              </p>
              <div className="cart-item-quantity-control">
                <button
                  className="quantity-button"
                  onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                  className="cart-item-quantity"
                />
                <button
                  className="quantity-button"
                  onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                >
                  +
                </button>
              </div>
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
    </div>
  );
}

export default CardShop;


