import mongoose from "mongoose"
import ProductModel from "../models/Product.js"
import { Request, Response } from "express"

// Get Products
const getProducts = async (req : Request , res : Response) => {
   try{
      const products = await ProductModel.find();
      if(products.length === 0){
         return res.status(404).json({success : 404 , message : "Pas de produits"})
      }
      return res.status(200).json({success : 200 , data : products})
   }catch(error) {
    console.log(error)  
     return res.status(500).json({success : false , message : "Erreur de serveur"})
   }
}

// Get Product 
const getProduct = async (req :Request<{id : string}> , res :Response) => {
   try{
      const {id} = req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({success: false, message: "ID invalide"})
}
      const product = await ProductModel.findById(id)
      if(!product){
         return res.status(404).json({success : false , message : "Produit introuvable"})
      }
        // Construire la réponse
      const productRes = {
         _id : product._id ,
         name : product.name, 
         price : product.price,
         description : product.description
      }
      return res.status(200).json({success : true , data : productRes})


   }catch(error){
      console.log(error)
      return res.status(500).json({success : false , message :"Erreur de serveur"})
   }
}

// Add Product
const addProduct = async (req : Request , res : Response) => {
    try{
      const {name , price , description} = req.body 
      if( !name || !price || !description){
         return res.status(400).json({success : false , message : "Tous les champs sont requis"})
      }
     
      const existProduct = await ProductModel.findOne({name})
      if(existProduct){
         return res.status(409).json({success : false , message : "Produit dèjà existe"})
      }

      const newProduct =  new ProductModel({
         name , 
         price ,
         description
      })
      await newProduct.save()

         // Construire la réponse
      const newProductRes = {
         _id : newProduct._id ,
         name : newProduct.name, 
         price : newProduct.price,
         description : newProduct.description
      }
      return res.status(200).json({success : true , message : "Produit ajouté avec succès" , data : newProductRes})
   }catch(error) {
    console.log(error)  
     return res.status(500).json({success : false , message : "Erreur de serveur"})
   }
}

// Update Product 
const updateProduct = async (req : Request<{id : string}> , res : Response) => {
   try{
     const {id} = req.params
     const {name , price , description} = req.body
      
     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({success : false , message : "ID invalide"})
     }
     if(!name || !price || !description){
         return res.status(400).json({success : false , message : "Tous les champs sont requis"})
     }
   
     const existProduct = await ProductModel.findById(id) 
     if(!existProduct) {
         return res.status(404).json({success : false , message: " Produit introuvable"})
     }
     const updatedProduct = await ProductModel.findByIdAndUpdate(id , {name , price , description},{ new: true } )
    // Construire la réponse
    const updatedProductRes = {
      _id: updatedProduct?._id,
      name: updatedProduct?.name,
      price: updatedProduct?.price,
      description: updatedProduct?.description,
    };
     return res.status(200).json({success : true , message : "Produit modifié avec succès" , data : updatedProductRes})

   }catch(error) {
    console.log(error)  
    return res.status(500).json({success : false , message : "Erreur de serveur"})
   }
}

// Delete Product
const deleteProduct = async (req : Request<{id : string}> , res :Response) => {
     try{
      const {id} = req.params 
      if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({success : false , message : "ID invalide"})
      }
 
      const existProduct = await ProductModel.findById(id)

      if(!existProduct){
         return res.status(404).json({success : false , message : "Produit introuvable"})
      }

      await ProductModel.findByIdAndDelete(id)
      return res.status(200).json({success : true , message : "Produit supprimé avec succès"})
      
   }catch(error) {
    console.log(error)  
     return res.status(500).json({success : false , message : "Erreur de serveur"})
   }
}


export {getProducts , getProduct , addProduct , updateProduct , deleteProduct}