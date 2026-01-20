import express from "express"
import {getProducts , getProduct , addProduct , updateProduct , deleteProduct} from "../controllers/productController.js"

const router = express.Router()

router.get("/" , getProducts)
router.get("/:id" , getProduct)
router.post("/add" , addProduct)
router.put("/:id" , updateProduct)
router.delete("/:id" , deleteProduct)

export default router