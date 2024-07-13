import { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard";
import { NewProductModal } from "../components/NewProductModal";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { useProduct } from "../hooks/useProduct";
import { Seeker } from "../components/Seeker";
import { Searcher } from "../components/Searcher";

export const Products = () => {

  // const [products, setProducts] = useState();

  const { products,
    getAllProducts,
    searchProductByString,
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
        {/* <Seeker
        onClickSearch={searchProductByString}
          setElementsFounded={searchProductByString}
        /> */}
        <Searcher
          onClickSearch={searchProductByString}
        />
        <section className="container row">
          {
            products.length > 0 ?
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
              :
              <h6>No se han encontrado resultados para tu búsqueda</h6>
          }
        </section>
      </div>
    </>
  )
}