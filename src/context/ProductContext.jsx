import { createContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/productReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, dispatch] = useReducer(productReducer, []);

  const [productPaginator, setProductPaginator] = useState({});

  const [productDbHasChanged, setProductDbHasChanged] = useState("");

  const dispatchAllProducts = (products) => dispatch({ type: "GET_ALL_PRODUCTS", payload: products });

  const dispatchProduct = (product) => dispatch({ type: "ADD_PRODUCT", payload: product });

  const dispatchUpdateProduct = (product) => dispatch({ type: "UPDATE_PRODUCT", payload: product });

  const dispatchDeleteProduct = (id) => dispatch({ type: "DELETE_PRODUCT", payload: id });




  return (
    <ProductContext.Provider value={{
      products,
      dispatchAllProducts,
      dispatchProduct,
      dispatchUpdateProduct,
      dispatchDeleteProduct,
      productDbHasChanged,
      setProductDbHasChanged,
      productPaginator,
      setProductPaginator
    }}>
      {children}
    </ProductContext.Provider>
  )

}