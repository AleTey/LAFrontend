import { useContext, useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard";
import { NewProductModal } from "../components/NewProductModal";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { useProduct } from "../hooks/useProduct";
import { Seeker } from "../components/Seeker";
import { Searcher } from "../components/Searcher";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { hasAnyRoleV2 } from "../auth/utils/hasAnyRole";

export const Products = () => {

  // const [products, setProducts] = useState();

  const { page } = useParams();

  const [searchIsActive, setSearchIsActive] = useState(false);

  const [stringToSearch, setStringToSearch] = useState("")

  const [pageOneAllProducts, setPageOneAllProducts] = useState([]);

  const { login } = useContext(AuthContext);

  const { products,
    productsFounded,
    getAllProducts,
    getPageOfProductsOnSearch,
    productDbHasChanged,
    productPaginator,
    getAllProductsCardDtoPage,
    getPageOfProductsCardDtoPageByString
  } = useProduct();

  const [productFormIsOpen, setProductFormIsOpen] = useState(false);

  useEffect(() => {
    if (searchIsActive) {
      getPageOfProductsCardDtoPageByString(stringToSearch, page)
    } else {
      getAllProductsCardDtoPage(page);
    }
  }, [, page])
  // useEffect(() => {
  //   // getPageOfProductsOnSearch
  //   console.log("PRODUCTS  USE EFFECT")
  //   console.log(productPaginator)
  //   console.log(productPaginator.totalPages)
  // }, [])

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
        {
          hasAnyRoleV2(["CREATE_PRODUCT"]) &&
          <button
            className="btn btn-outline-primary"
            onClick={() => setProductFormIsOpen(true)}>Nuevo Producto</button>
        }
        <hr />
        {/* <Seeker
        onClickSearch={searchProductByString}
          setElementsFounded={searchProductByString}
        /> */}
        <Searcher
          onClickSearch={getPageOfProductsCardDtoPageByString}
          pageNumber={page}
          setSearchIsActive={setSearchIsActive}
          path={'products'}
          setStringToSearch={setStringToSearch}
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
          {
            searchIsActive &&
            <h6 className="mt-3">{productPaginator.numberOfElements}/{productPaginator.totalElements} productos encontrados</h6>
          }
          {/* {
            searchIsActive ? (
              productsFounded.length === 0 ? (
                <h6>No se han encontrado resultados para tu búsqueda</h6>
              ) : (
                productsFounded.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                  />
                ))
              )
            ) : (
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            )
          } */}

          {/* {searchIsActive && productsFounded.length === 0 ?
            (<h6>No se han encontrado resultados para tu búsqueda</h6>

            ) : (
              productsFounded.length > 0 ?
                productsFounded.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                  />
                ))
            ) : (
              products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
          ))
          )
          } */}


          {/* {
            productsFounded.length > 0 ?
              productsFounded.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))
              :


              (stringToSearch && productsFounded.length === 0 ?
                <h6>No se han encontrado resultados para tu búsqueda</h6>
                :
                productsFounded.length === 0 && !stringToSearch ?
                  products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )))

          } */}

          {/* // (products.length > 0 && !stringToSearch ? */}
          {/* //   products.map(product => ( */}
          {/* //     <ProductCard */}
          {/* //       key={product.id} */}
          {/* //       product={product} */}
          {/* //     /> */}
          {/* //   )) */}
          {/* //   :
              //   <h6>No se han encontrado resultados para tu búsqueda</h6>) */}
        </section>
      </div>
      <div>
        <Paginator
          paginator={productPaginator}
          path='products'
        />
      </div>
    </>
  )
}