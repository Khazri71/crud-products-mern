import apiSlice from "../../app/api/apiSlice"
import type { Product } from "../../../types/Product"

export const productSlice =  apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        //Get Products 
        getProducts : builder.query<Product [],void>({
            query  : () => ({
                url : "/api/product",
            }),
            transformResponse : (response : {success : boolean  ,message : string, data : Product []}) => response.data,
            providesTags : ["Products"]
        }),

        //Get Product 
        getProduct : builder.query<Product , string>({
            query : (id) => ({
                 url : `/api/product/${id}`
            }),
            transformResponse : (response : {success:boolean , message : string, data : Product}) => response.data,
            providesTags : ["Products"]
        }),
        //Add Product 
        addProduct : builder.mutation <Product , { name : string , price : number , description : string}> ({
            query : (newProduct) => ({
                url : "/api/product/add",
                 method : "POST",
                 body : newProduct
            }),
            transformResponse : (response : {success : boolean  ,message : string, data : Product}) => response.data,
            invalidatesTags : ["Products"]

           

        }) ,
        //Update Product 
        updateProduct : builder.mutation <Product , {id :string ,name : string , price : number , description :string} >({
            query : ({id , ...updatedProduct}) => ({
                url : `/api/product/${id}`,
                method : "PUT",
                body : updatedProduct
            }),
            transformResponse : (response :  {success : boolean  ,message : string, data : Product}) =>  response.data,
            invalidatesTags : ["Products"]
        }),
        //Delete Product 
        deleteProduct : builder.mutation<{success :boolean , message : string} , string>({
            query : (id) => ({
                url: `/api/product/${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ["Products"]
        })
    })
})
// hooks auto-générés
export const {useGetProductsQuery , useGetProductQuery , useAddProductMutation , useUpdateProductMutation , useDeleteProductMutation} = productSlice

