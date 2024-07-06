import { useState } from "react"
import { Seeker } from "./Seeker"

export const ProductMultiSelector = ({ modalIsOpen, productsSelected, setProductsSelected, onChangeProduct }) => {

  const [productsFound, setProductsFound] = useState([]);

  const productSelectedHandler = (product) => {
    productsSelected.some(pSelected => pSelected.id === product.id) ?
      setProductsSelected(
        productsSelected.filter(p => p.id !== product.id)
      ) :
      setProductsSelected([
        ...productsSelected,
        product
      ])

    onChangeProduct(product.id);
  }


  const searchProduct = (string) => {
    const searchProductsDtoByString = async (string) => {
      try {
        const getProductsDto = await fetch(`http://localhost:8080/productos/dto/${string}`, {
          method: 'GET'
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
        }
      } catch (error) {
        console.log(error + " Error en fetch producto dto para product multi selector")
      }
    }
    searchProductsDtoByString(string);
  }

  return (
    <>
      <div className="modal fade show sm-0" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog sm-0">
          <div className="modal-content sm-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Seleccionador tela</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => modalIsOpen(false)}></button>
            </div>
            <div className="modal-body sm-0">

              <div className="container sm-0">

                <Seeker
                  onClickSearch={searchProduct}
                />

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Img</th>
                      <th>Producto</th>
                      <th>Modelo</th>
                      <th>Tipo</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productsFound &&
                      productsFound.map(product => (
                        <tr key={product.id}>
                          <th>{product.id}</th>
                          {
                            product.img ?
                              <th><img src={product.img} alt={product.nombre} style={{ maxWith: '4rem' }} className="img-thumbnail" /></th>
                              :
                              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '30%' }} className="img-fluid img-fluid" /></th>
                          }
                          <th>{product.nombre}</th>
                          <th>{product.model}</th>
                          <th>{product.tipoPrenda}</th>
                          <th>
                            {
                              productsSelected.some(ps => ps.id === product.id) ?
                                <button
                                  className="btn btn-danger"
                                  onClick={() => productSelectedHandler(product)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                  </svg>
                                </button>
                                :
                                <button
                                  className="btn btn-success align-middle"
                                  onClick={() => productSelectedHandler(product)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                  </svg>
                                </button>
                            }
                          </th>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}