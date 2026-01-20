import mongoose, { Document } from "mongoose"
import { Product } from "../types/Product.js"

export interface ProductDocument extends Product , Document {}


const productSchema = new mongoose.Schema<ProductDocument>({
   name : {type : String , required : true},
   price : {type : Number , required : true},
   description : {type : String , required : true}
}, {timestamps : true })

const ProductModel = mongoose.model<ProductDocument>("Product" , productSchema)

export default ProductModel