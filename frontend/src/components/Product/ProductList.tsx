import { BiShow } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import  {useDeleteProductMutation, useGetProductsQuery} from "../../redux/features/product/productSlice"
import type { Product } from "../../types/Product";
import { Link } from "react-router-dom";


export const ProductList : React.FC = () => {

  const {data : products , isLoading : isLoadingProducts , error : errorProducts   } = useGetProductsQuery()
  console.log(products)

  const [deleteProduct , {isLoading , isError , error}] = useDeleteProductMutation()

  const handleDeleteProduct = async (id : string) => {
    
    const confirmed = window.confirm("Supprimer ce produit ?")

    if(!confirmed) return 

     try{
        const data = await deleteProduct(id).unwrap()
        console.log(data)
        alert("Produit supprimé avec succès")
     }catch(error){
      console.log(error)
     }
  }


  if(isLoadingProducts || isLoading) return <div>Chargement...</div>
  if(errorProducts) return <div>Erreur lors de chargement de produits </div>
  if(isError && error) return <div>Erreur lors de suppression de produit</div>
  return (
    <>
    <div> 
     
     <h2 className="my-4 text-center">Gestion Produits</h2>

    <button className="btn border-dark text-white  p-0 mb-4 ">  <Link to="/add" className=" btn text-dark">  <FaPlus size={18}/> Ajouter </Link></button>

 <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nom</th>
      <th scope="col">Prix</th>
      <th scope="col">Description</th>
       <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>


   {products && products.map( (product : Product , index : number) => (   
    
    <tr key={product._id}>
      <th scope="row">{index}</th>
      <td>{product.name}</td>
      <td>{product.price} TND </td>
      <td>{product.description}</td>
      <td >
          <Link to={`/${product._id}`} className="text-dark"><BiShow  size={20} className="me-3" /></Link> 
         <Link to={`/edit/${product._id}`} className="text-dark"><TbEdit size={20} /></Link>
          <button onClick={() => handleDeleteProduct(product._id)} className="btn border-0"  ><MdDeleteOutline  size={20}/> </button>
      </td>
    </tr>) )

   }

    
  
  
  </tbody>
</table>

    </div>
   
    </>
  )
}
