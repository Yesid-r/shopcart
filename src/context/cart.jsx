import { createContext, useContext, useEffect, useReducer } from "react";

// Definir el estado inicial del carrito de compras
const initialCartState = {
  items: [],
  total: 0,
};

// Crear el contexto del carrito de compras
export const CartContext = createContext();

// Definir las acciones para el reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          items: updatedItems,
          total:
            state.total + action.payload.price * action.payload.quantity,
        };
      } else {
        // Si el producto no está en el carrito, agregarlo
        return {
          ...state,
          items: [...state.items, action.payload],
          total:
            state.total + action.payload.price * action.payload.quantity,
        };
      }

    case "REMOVE_FROM_CART":
      // Filtrar el producto del carrito
      const updatedItems = state.items.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        items: updatedItems,
        total:
          state.total - action.payload.price * action.payload.quantity,
      };

    case "CLEAR_CART":
      // Limpiar todo el carrito
      return {
        ...state,
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

// Crear el proveedor del contexto del carrito de compras
export const CartProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        // Inicializar el estado del carrito desde el localStorage, si está disponible
        JSON.parse(localStorage.getItem("cart")) || initialCartState
      );
    
      // Utilizar useEffect para guardar el estado del carrito en el localStorage cuando cambie
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartState));
      }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        addToCart: (item) =>
          dispatchCartAction({ type: "ADD_TO_CART", payload: item }),
        removeFromCart: (item) =>
          dispatchCartAction({ type: "REMOVE_FROM_CART", payload: item }),
        clearCart: () => dispatchCartAction({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para acceder al contexto del carrito de compras
export const useCart = () => {
  return useContext(CartContext);
};
