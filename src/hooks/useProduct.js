import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProduct = () => {

  const [productsFounded, setProductsFounded] = useState([]);

  const { products,
    dispatchAllProducts,
    dispatchProduct,
    dispatchUpdateProduct,
    dispatchDeleteProduct,
    productDbHasChanged,
    setProductDbHasChanged,
    productPaginator,
    setProductPaginator
  } = useContext(ProductContext);

  const getAllProducts = async (pageNumber = 0) => {
    const url = new URL('http://localhost:8080/productos/page')
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('size', 3);
    console.log(url.toString());
    const getAllProducts = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (getAllProducts.ok) {
      const getAllProductsJson = await getAllProducts.json();
      const productWithImgUrl = getAllProductsJson.content.map(product => {
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
      dispatchAllProducts(productWithImgUrl);
      setProductPaginator(getAllProductsJson);
      setProductPaginator({
        ...Object.entries(getAllProductsJson)
          .filter(([key, value]) => key !== 'content')
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      });
    }
  }

  const getPageOfProductsOnSearch = async (string, pageNumber = 0) => {
    console.log(pageNumber)
    const url = new URL('http://localhost:8080/productos/page/search');
    url.searchParams.append('string', string);
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('size', 1);
    const res = await fetch(url.toString());

    if (res.ok) {
      const resJson = await res.json();
      const productsWithImg = resJson.content.map(p => {
        if (p.img) {
          return {
            ...p,
            img: `data:image/jpeg;base64,${p.img}`
          }
        }
        return {
          ...p,
          img: null
        }
      })
      console.log(productsWithImg);
      dispatchAllProducts(productsWithImg);
      setProductsFounded(productsWithImg);
      setProductPaginator({
        ...Object.entries(resJson)
          .filter(([key, value]) => key !== 'content')
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      });
    }
  }

  const addNewProduct = async (productForm, setProductFormIsOpen) => {
    const formData = new FormData();
    formData.append('nombre', productForm.nombre);
    formData.append('colorForro', productForm.colorForro);
    formData.append('imageFile', productForm.img);
    formData.append('fabricJson', JSON.stringify(productForm.fabric));
    formData.append('modelAndStripsForProductJson', JSON.stringify(productForm.modelAndStripsForProduct));


    try {
      const newProduct = await fetch('http://localhost:8080/productos/producto', {
        method: 'POST',
        body: formData
      })

      if (newProduct.ok) {
        console.log(newProduct)
        const response = await newProduct.json();
        console.log(response)
        if (response.img) {
          const imageBase64 = response.img;
          const imgUrl = `data:image/jpeg;base64,${imageBase64}`;
          const responseWithImg = {
            ...response,
            img: imgUrl
          }
          dispatchProduct(responseWithImg);
          setProductFormIsOpen(false);
        } else {
          dispatchProduct(response);
          setProductFormIsOpen(false);
        }

        console.log(response);
      }
      if (!newProduct.ok) {
        console.log("not ok")
      }
    } catch (error) {
      console.log(error)
    }
  }



  const deleteProduct = async (id) => {
    const deleteProduct = await fetch(`http://localhost:8080/productos/${id}`, {
      method: "DELETE"
    });
    if (deleteProduct.ok) {
      dispatchDeleteProduct(id);
      setProductDbHasChanged("Producto eliminado con éxito")
      setTimeout(() => {
        setProductDbHasChanged("")
      }, 5000)
    }
  }

  const updateProduct = async (productForm) => {
    const formData = new FormData();
    const fabric = {
      id: productForm.fabric.id
    }

    const modelAndStripsForProduct = {
      model: {
        id: productForm.modelAndStripsForProduct.model.id
      },
      stripDetailsForProducts:
        productForm.modelAndStripsForProduct.stripDetailsForProducts.map(d => {
          return {
            id: d.id,
            fabric: {
              id: d.fabric.id
            },
            width: d.width,
            quantityPerSize: d.quantityPerSize
          }
        })

    }
    console.log("modelAndStripsFroProduct")
    console.log(modelAndStripsForProduct);
    formData.append('nombre', productForm.nombre);
    formData.append('colorForro', productForm.colorForro);
    formData.append('imageFile', productForm.img);
    formData.append('fabricJson', JSON.stringify(fabric));
    formData.append('modelAndStripsForProductJson', JSON.stringify(modelAndStripsForProduct));

    console.log(productForm.nombre)
    console.log(productForm.colorForro)
    console.log(productForm.fabric)
    console.log(productForm.modelAndStripsForProduct)

    console.log(formData)

    try {
      const updatedProduct = await fetch(`http://localhost:8080/productos/update-product/${productForm.id}`, {
        method: "PUT",
        body: formData
      })

      if (updatedProduct.ok) {
        console.log("updated product: ")
        console.log(updatedProduct);

        const response = await updatedProduct.json();
        if (response.img) {
          const imageBase64 = response.img;
          const imgUrl = `data:image/jpeg;base64,${imageBase64}`;
          const responseWithImage = {
            ...response,
            img: imgUrl
          }
          dispatchUpdateProduct(responseWithImage);
        } else {
          dispatchUpdateProduct(response);
        }
      }
    } catch (error) {

    }

  }

  const searchProductByString = async (string) => {
    try {
      const res = await fetch(`http://localhost:8080/productos/find-by-string/${string}`);
      if (res.ok) {
        const resJson = await res.json();
        dispatchAllProducts(convertProductListToProductsWithImgList(resJson));
      }
    } catch (error) {

    }
  }

  const convertProductListToProductsWithImgList = (productList) => {
    const productsWithImgs = productList.map(product => {
      if (product.img) {
        return {
          ...product,
          img: `data:image/jpeg;base64,${product.img}`
        }
      }
      return product
    })
    return productsWithImgs;
  }


  return {
    products,
    productsFounded,
    getAllProducts,
    getPageOfProductsOnSearch,
    addNewProduct,
    deleteProduct,
    updateProduct,
    searchProductByString,
    productDbHasChanged,
    productPaginator
  }
}