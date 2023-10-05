// ProductList.js
import React, { useEffect } from "react";
import { useCart } from "../context/cart";

function ProductList() {
    const { addToCart } = useCart();
    const { cart } = useCart();
    console.log("car")
    console.log(cart)

    const products = [
        {
            _id: "1",
            name: "Camiseta",
            description: "Tenis",
            price: 40000,
            stock: 20,
        },
        // Otros productos...
    ];

    const handleAddToCart = (product) => {
        // Aquí, puedes llamar a addToCart para agregar el producto al carrito
        addToCart({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1, // Puedes ajustar la cantidad según tus necesidades
        });
        
    };
    // useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     console.log("efect", cart )
    //   }, [cart]);

    return (
        <div>
            <h2>Productos</h2>
            <ul>
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <h3>{product.name}</h3>
                        <div className="product-image">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <p>Precio: ${product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>
                            Agregar al carrito
                        </button>
                    </div>
                ))}

            </ul>

            <a href="/cart">
                Ir al carrito
            </a>
        </div>
    );
}

export default ProductList;
