import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { messageInfo } from "../components/alerts/messageInfo";
import { AuthContext } from "../auth/context/AuthContext";

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
    setProductPaginator,
    isLoading,
    setIsLoading
  } = useContext(ProductContext);

  const { handlerLogout } = useContext(AuthContext);

  const getAllProducts = async (pageNumber = 0) => {
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/productos/page`)
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('size', 3);
    console.log(url.toString());
    const getAllProducts = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        "Authorization": sessionStorage.getItem("token"),
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
    } else {
      const error = await getAllProducts.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }
  const getAllProductsCardDtoPage = async (pageNumber = 0) => {
    setIsLoading(true)
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/productos/page/card-dto`)
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('size', 3);
    const getAllProducts = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    });
    if (getAllProducts.ok) {
      setIsLoading(false);
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
    } else {
      setIsLoading(false);
      const error = await getAllProducts.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const getPageOfProductsOnSearch = async (string, pageNumber = 0) => {
    console.log(pageNumber)
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/productos/page/search`);
    url.searchParams.append('string', string);
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('size', 1);
    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });

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
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }
  const getPageOfProductsCardDtoPageByString = async (string, pageNumber = 0) => {
    console.log(pageNumber)
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/productos/page/card-dto/by-string`);
    url.searchParams.append('string', string);
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('size', 4);
    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });

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
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const addNewProduct = async (productForm, setProductFormIsOpen) => {
    console.log(productForm)
    const formData = new FormData();
    formData.append('nombre', productForm.nombre);
    formData.append('colorForro', productForm.colorForro);
    formData.append('imageFile', productForm.img);
    formData.append('fabricJson', JSON.stringify(productForm.fabric));
    formData.append('modelAndStripsForProductJson', JSON.stringify(productForm.modelAndStripsForProduct));


    try {
      const newProduct = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos/producto`, {
        method: 'POST',
        headers: {
          "Authorization": sessionStorage.getItem("token")
        },
        body: formData
      })

      if (newProduct.ok) {
        console.log(newProduct)
        const response = await newProduct.json();
        console.log(response)
        if (response.urlFile) {
          // const imageBase64 = response.img;
          // const imgUrl = `data:image/jpeg;base64,${imageBase64}`;
          const responseWithImg = {
            ...response,
            urlFile: response.urlFile
          }
          dispatchProduct(responseWithImg);
          setProductFormIsOpen(false);
        } else {
          dispatchProduct(response);
          setProductFormIsOpen(false);
        }

        console.log(response);
      } else {
        const error = await newProduct.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }
    } catch (error) {
      console.log(error)
    }
  }



  const deleteProduct = async (id) => {
    const deleteProduct = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (deleteProduct.ok) {
      dispatchDeleteProduct(id);
      setProductDbHasChanged("Producto eliminado con éxito")
      setTimeout(() => {
        setProductDbHasChanged("")
      }, 5000)
    } else {
      const error = await deleteProduct.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const updateProduct = async (productForm, setProductFormIsOpen) => {
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

    formData.append('nombre', productForm.nombre);
    formData.append('colorForro', productForm.colorForro);
    formData.append('imageFile', productForm.img);
    formData.append('fabricJson', JSON.stringify(fabric));
    formData.append('modelAndStripsForProductJson', JSON.stringify(modelAndStripsForProduct));

    try {
      const updatedProduct = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos/update-product/${productForm.id}`, {
        method: "PUT",
        headers: {
          "Authorization": sessionStorage.getItem("token")
        },
        body: formData
      })

      if (updatedProduct.ok) {

        const response = await updatedProduct.json();
        if (response.urlFile) {
          // const imageBase64 = response.img;
          // const imgUrl = `data:image/jpeg;base64,${imageBase64}`;
          const responseWithImage = {
            ...response,
            urlFile: response.urlFile
          }
          dispatchUpdateProduct(responseWithImage);
          setProductFormIsOpen(false)
        } else {
          dispatchUpdateProduct(response);
          setProductFormIsOpen(false)
        }
      } else {
        const error = await updateProduct.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }
    } catch (error) {

    }

  }

  const searchProductByString = async (string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos/find-by-string/${string}`, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      });
      if (res.ok) {
        const resJson = await res.json();
        dispatchAllProducts(convertProductListToProductsWithImgList(resJson));
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
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


  const calculateCost = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos/product-cost/${id}`, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      });
      console.log(res);
      if (res.ok) {
        const resJson = await res.json();
        console.log(typeof resJson) // Esto debería imprimir el tipo de dato de resJson
        return resJson;
      } else {
        if (res.status === 409) {
          messageInfo("No hay lotes suficientes para calcular el costo");
        }
        console.log(res.status)
        const error = await getAllProducts.json();
        if (error.message === "Please Login") {
          handlerLogout();
        } else {
          const error = new Error("Error en la solicitud");
          error.response = res;
          throw error;
        }
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        messageInfo({ message: "Para poder calcular el costo de un producto, tiene que haber como mínimo un lote finalizado del mismo." })
      }
    }
  }

  const searchProductsDtoByString = async (string, setProductsFound) => {
    try {
      const getProductsDto = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos/dto/${string}`, {
        method: 'GET',
        headers: {
          'Authorization': sessionStorage.getItem('token')
        }
      })

      if (getProductsDto.ok) {
        const resJson = await getProductsDto.json();
        const productsWithImg = resJson.map(p => {
          const imgUrl = `data:image/jpeg;base64,${p.img}`
          if (p.img) {
            return {
              ...p,
              img: imgUrl
            };
          };
          return {
            ...p,
            img: null
          }
        })
        setProductsFound(productsWithImg);
      } else {
        const error = await getProductsDto.json();
        if (error.message === "Pleas Login") {
          handlerLogout();
        }
      }
    } catch (error) {
      console.log(error + " Error en fetch producto dto para product multi selector")
    }
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
    calculateCost,
    productDbHasChanged,
    productPaginator,
    searchProductsDtoByString,
    getAllProductsCardDtoPage,
    getPageOfProductsCardDtoPageByString,
    isLoading,
    setIsLoading
  }
}