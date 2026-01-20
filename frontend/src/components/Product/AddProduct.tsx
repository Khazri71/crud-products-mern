import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../redux/features/product/productSlice";
export const AddProduct : React.FC= () => {

 const navigate = useNavigate()
  const [formData , setFormData] = useState({
    name : "", 
    price : 0,
    description : ""
  })

   const [addProduct , {isLoading , isError , error}] = useAddProductMutation()


  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>  ) => {
    const {name , value} = e.target 
    setFormData((prev) => ({...prev , [name] : value}))
    }



    const handleSubmitAddProduct = async (e : React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
      try{
         const data = await addProduct(formData).unwrap()
         console.log(data)
         setFormData({
            name : "", 
            price : 0,
            description : ""
         })
         navigate("/")

      }catch(error){
        console.log(error)
      }
    }



 if(isLoading) return <div>Chargement...</div>
 if(isError && error) return <div>Erreur</div>
  return (
    <>
     <h2 className="my-4 text-center">Ajouter</h2>
  <form onSubmit={handleSubmitAddProduct}>
 <div className="row g-3">

 <div className="col-6">
  <div>
  <label htmlFor="inputName4" className="form-label">Nom</label>
  <input type="text" className="form-control" id="inputName4" placeholder="Entrez le nom" required
  name = "name"
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
    <button  className="btn btn-dark">Ajouter</button>

</div>
</form>
   
    </>
  )
}
