import {Routes , Route , Navigate} from "react-router-dom"
import { ProductList } from "./components/Product/ProductList"
import { Layout } from "./components/Layout"
import { AddProduct } from "./components/Product/AddProduct"
import { ProductDetail } from "./components/Product/ProductDetail"
import { EditProduct } from "./components/Product/EditProduct"

function App() {
  
  return (
    <>
  
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index  element={<ProductList/>}/>
         <Route  path=":id" element={<ProductDetail/>} />
         <Route path="add" element={<AddProduct/>} />
        <Route  path="edit/:id" element={<EditProduct/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>


    </>
  )
}

export default App
