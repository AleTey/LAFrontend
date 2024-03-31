import { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard";
import { NewProductModal } from "../components/NewProductModal";

export const Products = () => {

  const [products, setProducts] = useState();

  const [productFormIsOpen, setProductFormIsOpen] = useState(false);

  const getAllProducts = async () => {
    const getAllProducts = await fetch("http://localhost:8080/productos")
    if (getAllProducts.ok) {
      const getAllProductsJson = await getAllProducts.json();
      const productWithImgUrl = getAllProductsJson.map(product => {
        const imageBase64 = product.img;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        if (product.img) {
          return {
            ...product,
            img: imageUrl
          };
        };
        return {
          ...product,
          img: null
        };
      })
      setProducts(productWithImgUrl);
    }
  }

  useEffect(() => {
    if (!products) {
      getAllProducts();
    }
  }, [])

  return (
    <>
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
        {
          products &&
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </>
  )
}