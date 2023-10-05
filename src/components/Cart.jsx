// Cart.js
import React from "react";
import { useCart } from "../context/cart";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const cartDataJSON = localStorage.getItem("cart");
  console.log(cartDataJSON)
  const handleRemoveFromCart = (item) => {
    // Llama a la función removeFromCart para eliminar un producto del carrito
    removeFromCart(item);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Descripción: {item.description}</p>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item)}>
                Eliminar del carrito
              </button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.total}</p>
      <a href="/">
        ir al inicio
      </a>
    </div>

  );
}

export default Cart;
