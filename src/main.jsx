import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/cart.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

    <CartProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      
    </CartProvider>
    

)
