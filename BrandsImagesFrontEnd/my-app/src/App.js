import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GetAllBrands from './Component/GetAllBrands'
import AddBrand from './Component/AddBrand'
import UpdateBrand from './Component/UpdateBrand'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetAllBrands />} />
          <Route path="/addBrand" element={<AddBrand />} />
          <Route path='/update' element={<UpdateBrand />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
