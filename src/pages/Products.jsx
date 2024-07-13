import { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard";
import { NewProductModal } from "../components/NewProductModal";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { useProduct } from "../hooks/useProduct";
import { Seeker } from "../components/Seeker";

export const Products = () => {

  // const [products, setProducts] = useState();

  const { products,
    getAllProducts,
    productDbHasChanged
  } = useProduct();

  const [productFormIsOpen, setProductFormIsOpen] = useState(false);


  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <>
      {
        productDbHasChanged &&
        <FetchTopAlert
          text={productDbHasChanged}
        />
      }
      {
        productFormIsOpen &&
        <NewProductModal
          setProductFormIsOpen={setProductFormIsOpen}
        />
      }
      <div className="container-sm">
        <h3 className="my-3">Productos</h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => setProductFormIsOpen(true)}>Nuevo Producto</button>
        <hr />
<Seeker 

/>
        <section className="container row">
          {
            products &&
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          }
        </section>
      </div>
    </>
  )
}