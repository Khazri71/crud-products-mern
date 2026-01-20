import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../../redux/features/product/productSlice";
export const EditProduct : React.FC = () => {



  const {id} = useParams<{id : string}>()
  const navigate = useNavigate()


  const [formData , setFormData] =useState({
    name : "" , 
    price : 0 ,
     description : ""
  })
 

  

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name , value} = e.target
      setFormData((prev) => ({...prev , [name] : value}))
  }

  const {data : product , isLoading : isLoadingProduct} = useGetProductQuery(id!)

  useEffect(() => {
    if(product){
      setFormData({
        name :product.name,
        price : product.price,
        description : product.description || ""
      })
    }
  },[product])

    const [updateProduct , {isLoading , isError , error}] = useUpdateProductMutation()
  const handleSubmitUpdateProduct = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  
    try{
      const data = await updateProduct({id: id!, ...formData}).unwrap()
      console.log(data)
      navigate("/")

    }catch(error){
      console.log(error)
    }

  }
    

  if(isLoadingProduct || isLoading ) return <div>Chargement...</div>
  if(isError && error) return <div>Erreur</div>

  return (
    <>

 <h2 className="my-4 text-center">Modifier Produit</h2>
    <form  onSubmit={handleSubmitUpdateProduct}>
         
      <div className="row g-3">
     
     
      <div className="col-6">
       <div>
       <label htmlFor="inputName4" className="form-label">Nom</label>
       <input type="text" className="form-control" id="inputName4" placeholder="Entrez le nom" required
       name="name"
       value={formData.name}
       onChange={handleChange}
       />
       </div>
       </div>
     
     
       <div className="col-6">
       <div>
       <label htmlFor="inputPrice4" className="form-label">Prix</label>
       <input type="number" min={10}  className="form-control" id="inputPrice4" required
       name="price"
       value={formData.price}
       onChange={handleChange}
       />
        </div>
       </div>
     
     
        <div className="col">
         <label htmlFor="inputDescription4" className="form-label">Description</label>
         <textarea className="form-control"  rows={3} cols={10}  id="inputDescription4"  placeholder="Décrire..." required
         name="description"
         value={formData.description}
         onChange={handleChange}
         />
         </div>
        </div>
     
     <div className="my-3">
      <Link to="/" className="btn btn-dark me-2"><IoChevronBack /> Retour</Link>
         <button  className="btn btn-dark">Modifier</button>
     
     </div>
        
 </form>
    </>
  )
}
