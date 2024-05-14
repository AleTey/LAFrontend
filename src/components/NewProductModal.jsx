import { useEffect, useState } from "react";
import { Input } from "./formComponents/Input"
import { FabricSelector } from "./FabricSelector";
import { FabricSelectedAtFormCard } from "./fabricSelectedAtFormCard";
import { ModelSelectorOfProductModal } from "./ModelSelectorOfProductModal";
import { ModelSelectedAtFormCard } from "./ModelSelectedAtFormCard";
import { AccordionItem } from "./bootstrapComponents/AccordionItem";
import { FabricMultiSelector } from "./FabricMultiSelector";

const productFormInitialState = {
  nombre: "",
  colorForro: "",
  fabric: {
    id: 0
  },
  modelAndStripsForProduct: {
    model: {
      id: 0
    },
    stripDetailsForProduct: []
  },
  img: null
}
export const NewProductModal = ({ setProductFormIsOpen, productData = productFormInitialState }) => {

  const [productForm, setProductForm] = useState(productData);

  const [pickFabricIsOpen, setPickFabricIsOpen] = useState(false);

  const [pickModelIsOpen, setPickModelIsOpen] = useState(false);

  const [pickFabricForTira, setPickFabricForTira] = useState(false);

  const [fabricSelected, setFabricSelected] = useState({});

  const [modelSelected, setModelSelected] = useState({});

  const [fabricsPerTira, setFabricsPerTira] = useState([]);

  const [telasSeleccionadasParaTiras, setTelasSeleccionadasParaTiras] = useState([]);

  const [fabricSelectedForTiras, setFabricSelectedForTiras] = useState();


  const onChangeForm = (e) => {
    const { name, value } = e.target;



    if (name === "nombre" || name === "colorForro") {
      setProductForm({
        ...productForm,
        [name]: value
      })
    }
  }

  const onChangeFabric = (fabricId) => {
    setProductForm({
      ...productForm,
      fabric: {
        id: fabricId
      }
    })
  }

  const onChangeModel = (modelId) => {
    setTelasSeleccionadasParaTiras([])

    // setProductForm({
    //   ...productForm,
    //   modelAndStripsForProduct: {
    //     ...productForm.modelAndStripsForProduct,
    //     stripDetailsForProduct: {}
    //   }
    // })


    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        model: {
          id: modelId
        },
        stripDetailsForProduct: []
      }
    })
  }

  const onChangeFabricForTira = (e, f, ancho) => {
    e.preventDefault()
    setTelasSeleccionadasParaTiras([
      ...telasSeleccionadasParaTiras,
      f
    ])
    console.log(telasSeleccionadasParaTiras)
    console.log(f)
    console.log(modelSelected)
    // console.log(modelSelected.detalleTiraModelo.tirasPorTalle)
    modelSelected.detalleTiraModelo.map(item => (
      console.log(item)
    ))
    console.log(modelSelected.detalleTiraModelo)

    // if (productForm.modelAndStripsForProduct.stripDetailsForProduct && ) {

    // }

    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        ...productForm.modelAndStripsForProduct,
        stripDetailsForProduct: [
          ...productForm.modelAndStripsForProduct.stripDetailsForProduct,
          {
            fabric: {
              id: f.id
            },
            width: ancho,
            quantityPerSize: modelSelected.detalleTiraModelo
          }
        ]
      }
    })

  }

  const onCancelFabric = (e, ancho, fabricId) => {
    e.preventDefault();
    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        ...productForm.modelAndStripsForProduct,
        stripDetailsForProduct: productForm.modelAndStripsForProduct.stripDetailsForProduct.filter(stripD => stripD.ancho != ancho && stripD.fabric.id != fabricId)
      }
    })
  }

  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nuevo Producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setProductFormIsOpen(false)}></button>
            </div>
            <div className="modal-body">

              <div className="container">

                <form action="" >

                  <Input
                    name={"nombre"}
                    placeHolder={"Nombre nuevo producto"}
                    value={productForm.nombre}
                    type="text"
                    onChangeInput={onChangeForm}
                  />
                  <Input
                    name={"colorForro"}
                    placeHolder={"Color del forro"}
                    value={productForm.colorForro}
                    type="text"
                    onChangeInput={onChangeForm}
                  />

                  <hr />
                  <h5>Tela</h5>

                  {
                    fabricSelected.id &&
                    <FabricSelectedAtFormCard
                      fabric={fabricSelected}
                    />
                  }

                  <button
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPickFabricIsOpen(true)
                    }}>
                    Seleccionar tela
                  </button>
                  {
                    pickFabricIsOpen &&
                    <FabricSelector
                      closeModal={setPickFabricIsOpen}
                      onChangeFabric={onChangeFabric}
                      fabricSelected={fabricSelected}
                      setFabricSelected={setFabricSelected}
                    />
                  }
                  <hr />

                  <h5 className="mt-3">Modelo</h5>
                  {modelSelected.id &&
                    <ModelSelectedAtFormCard
                      model={modelSelected}
                    />
                  }
                  {pickModelIsOpen &&
                    <ModelSelectorOfProductModal
                      closeModal={setPickModelIsOpen}
                      modelSelected={modelSelected}
                      setModelSelected={setModelSelected}
                      onChangeModel={onChangeModel}
                    />
                  }
                  <button
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPickModelIsOpen(true)
                    }}>
                    Seleccionar modelo
                  </button>
                  <hr />
                  <h5>Tiras</h5>

                  <div className="accordion" id="accordionPanelsStayOpenExample">
                    {
                      modelSelected &&
                      modelSelected.detalleTiraModelo &&
                      modelSelected.detalleTiraModelo.map(detalle => (


                        <div className="accordion-item" key={detalle.id}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              // data-bs-target="#panelsStayOpen-collapseTwo"
                              data-bs-target={`#panelsStayOpen-${detalle.id}`}
                              aria-expanded="false"
                              // aria-controls="panelsStayOpen-collapseTwo"
                              aria-controls={`panelsStayOpen-${detalle.id}`}
                            >
                              {`Tira ${detalle.tira.ancho} cm`}
                            </button>
                          </h2>
                          <div id={`panelsStayOpen-${detalle.id}`} className="accordion-collapse collapse">
                            <div className="accordion-body row">
                              <strong>{`Agregar uno a uno las telas que se utilizaran para las tiras de ${detalle.tira.ancho} cm`}</strong>
                              {
                                productForm.modelAndStripsForProduct.stripDetailsForProduct &&

                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Id</th>
                                      <th scope="col">Img</th>
                                      <th scope="col">Ancho</th>
                                      <th scope="col">Cantidad</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      telasSeleccionadasParaTiras.length > 0 &&
                                      productForm.modelAndStripsForProduct.stripDetailsForProduct.map(detail => (

                                        <tr key={detail.fabric.id}>
                                          <th scope="row">{detail.fabric.id}</th>
                                          {/* <th scope="row">{telasSeleccionadasParaTiras.find(f => f.id === detail.fabric.id).id}</th> */}
                                          {
                                            // detail.fabric.img ?
                                            telasSeleccionadasParaTiras.find(f => f.id === detail.fabric.id).img ?
                                              <th><img src={telasSeleccionadasParaTiras.find(f => f.id === detail.fabric.id).img} alt="" style={{ maxWidth: '20%' }} className="img-thumbnail" /></th>
                                              // <th><img src={detail.fabric.img} alt="" style={{ maxWidth: '4rem' }} className="img-thumbnail" /></th>
                                              :
                                              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '20%' }} className="img-fluid img-fluid" /></th>
                                          }
                                          {/* <td>Mark</td> */}
                                          <td>{detail.ancho}</td>
                                          <td><input type="range" className="form-range" /></td>
                                        </tr>
                                      ))
                                    }
                                  </tbody>
                                </table>


                              }
                              {
                                pickFabricForTira &&
                                <FabricMultiSelector
                                  closeModal={setPickFabricForTira}
                                  onChangeFabric={onChangeFabricForTira}
                                  ancho={detalle.tira.ancho}
                                  telasSeleccionadas={productForm.modelAndStripsForProduct.stripDetailsForProduct}
                                  onCancelFabric={onCancelFabric}
                                />
                              }

                              <button
                                className="btn btn-primary mt-3"
                                onClick={(e) => { e.preventDefault(), setPickFabricForTira(true) }}>
                                Asignar nueva tela
                              </button>

                            </div>
                          </div>
                        </div>

                      ))
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}