import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'


const Routers = () => {


  return (
    <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />

    </Routes>
  )
}

export default Routers