import { IoChevronBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/features/product/productSlice";

export const ProductDetail : React.FC = () => {

  const {id} = useParams<{id : string}>()
  const {data : product  , isLoading  , error} = useGetProductQuery(id!);



  if(isLoading) return <div>Chargement...</div>
  if(error) return <div>Erreur</div>
  return (
    <>
 <h2 className="my-3 text-center"> Afficher Produit</h2>
<div className="card my-4">
  <div className="card-body text-center">
    <h5 className="card-title">{product?.name}</h5>
    <p className="card-text">{product?.price + " TND"}</p>
    <p className="card-text">{product?.description}</p>
    <Link to="/" className="btn btn-dark"><IoChevronBack /> Retour</Link>
  </div>
</div>

    </>
  )
}
