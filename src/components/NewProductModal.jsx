import { Fragment, useEffect, useState } from "react";
import { Input } from "./formComponents/Input"
import { FabricSelector } from "./FabricSelector";
import { FabricSelectedAtFormCard } from "./fabricSelectedAtFormCard";
import { ModelSelectorOfProductModal } from "./ModelSelectorOfProductModal";
import { ModelSelectedAtFormCard } from "./ModelSelectedAtFormCard";
import { AccordionItem } from "./bootstrapComponents/AccordionItem";
import { FabricMultiSelector } from "./FabricMultiSelector";
import { ImgSelector } from "./formComponents/ImgSelector";
import { useProduct } from "../hooks/useProduct";
import { useIsBase64Image } from "../hooks/utils/useIsBase64Image";

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
    stripDetailsForProducts: []
  },
  img: null
}

const productValidationForm = (productForm) => {

  let errors = {};

  if (!productForm.nombre.trim()) {
    errors.nombre = "El valor nombre es obligatorio";
  }

  if (productForm.fabric.id === 0) {
    errors.fabric = "Seleccionar una tela"
  }

  if (productForm.modelAndStripsForProduct.model.id === 0) {
    errors.model = "Seleccionar un modelo"
  }

  // if (productForm.modelAndStripsForProduct.model.id !== 0) {



  const quantityPerSizeWithValueZero = productForm.modelAndStripsForProduct.stripDetailsForProducts.some(d => (
    Object.values(d.quantityPerSize).some(value => value == 0)
  ));
  console.log(quantityPerSizeWithValueZero)
  if (quantityPerSizeWithValueZero) {
    errors.oneQuantityHasValueAtZero = "Se encontraron valores en 0"
    console.log("UNO EN CERO")
  }
  // }


  return errors;
}

export const NewProductModal = ({ setProductFormIsOpen, productData = productFormInitialState }) => {

  const { addNewProduct, updateProduct } = useProduct();

  const { isBase64Image } = useIsBase64Image()

  const [productForm, setProductForm] = useState(productData);

  const [pickFabricIsOpen, setPickFabricIsOpen] = useState(false);

  const [pickModelIsOpen, setPickModelIsOpen] = useState(false);

  const [pickFabricForTira, setPickFabricForTira] = useState(false);

  const [fabricSelected, setFabricSelected] = useState({});

  const [modelSelected, setModelSelected] = useState({});

  const [telasSeleccionadasParaTiras, setTelasSeleccionadasParaTiras] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productForm.id) {
      const imgBase64 = productForm.fabric.img;
      const imgUrl = `data:image/jpeg;base64,${imgBase64}`;



      setFabricSelected({
        ...productForm.fabric,
        img: imgUrl
      })
      setProductForm({
        ...productForm,
        fabric: {
          ...productForm.fabric,
          img: imgUrl
        }
      })
      setModelSelected({
        ...productForm.modelAndStripsForProduct.model
      })
      const stripDetailsWithImg = productForm.modelAndStripsForProduct.stripDetailsForProducts.map(d => {
        if (d.fabric.img) {
          const imgBase64 = d.fabric.img;
          const imgUrl = `data:image/jpeg;base64,${imgBase64}`;
          return {
            ...d,
            fabric: {
              ...d.fabric,
              img: imgUrl
            }
          }
        }
        return d;
      })
      const fabricsForTelasSeleccionadas = productForm.modelAndStripsForProduct.stripDetailsForProducts.map(d => {
        if (d.fabric.img) {
          const imgBase64 = d.fabric.img;
          const imgUrl = `data:image/jpeg;base64,${imgBase64}`;
          return {
            ...d.fabric,
            img: imgUrl
          }
        }
        return d.fabric;
      })
      setTelasSeleccionadasParaTiras(fabricsForTelasSeleccionadas);
    }
  }, [])


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
    console.log(fabricId)
    setProductForm({
      ...productForm,
      fabric: {
        id: fabricId
      }
    })
  }

  const onChangeModel = (model) => {

    setTelasSeleccionadasParaTiras([])
    setTelasSeleccionadasParaTiras([fabricSelected])
    setModelSelected(model);
    stripDetailsForProductOnChangeModel(model);

  }

  const stripDetailsForProductOnChangeModel = (model) => {

    let stripDetail = [];
    model.detalleTiraModelo.map(detalleTira => (
      stripDetail = [
        ...stripDetail,
        {
          fabric: {
            id: fabricSelected.id
          },
          width: detalleTira.tira.ancho,
          quantityPerSize: detalleTira.tirasPorTalle
        }
      ]
    ))

    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        model: {
          id: model.id
        },
        stripDetailsForProducts: stripDetail
      }
    })

  }

  const onChangeFabricForTira = (e, f, ancho) => {
    console.log(f)
    console.log(ancho)
    // console.log("agragando fabric for tira");
    // console.log(f);
    e.preventDefault()
    setTelasSeleccionadasParaTiras([
      ...telasSeleccionadasParaTiras,
      f
    ])
    // modelSelected.detalleTiraModelo.map(item => (
    //   console.log(item)
    // ))
    console.log(modelSelected)
    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        ...productForm.modelAndStripsForProduct,
        stripDetailsForProducts: [
          ...productForm.modelAndStripsForProduct.stripDetailsForProducts,
          {
            fabric: {
              id: f.id
            },
            width: ancho,
            quantityPerSize: modelSelected.detalleTiraModelo.find(d => (
              d.tira.ancho === ancho
            )).tirasPorTalle
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
        stripDetailsForProducts: productForm.modelAndStripsForProduct.stripDetailsForProducts.filter(stripD => stripD.ancho != ancho && stripD.fabric.id != fabricId)
      }
    })
  }

  const onChangeCantTirasPorTalle = (e, idFabric, width) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updatedStrips = productForm.modelAndStripsForProduct.stripDetailsForProducts.map(d => {
      if (d.fabric.id === idFabric && d.width === width) {
        return {
          ...d,
          quantityPerSize: {
            ...d.quantityPerSize,
            [name]: value
          }
        }
      }
      return d;
    })

    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        ...productForm.modelAndStripsForProduct,
        stripDetailsForProducts: updatedStrips
      }
    })
  }

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setProductForm({
      ...productForm,
      [e.target.name]: file
    })
  }

  const onDeleteFabricForTira = (e, detail) => {
    e.preventDefault();
    console.log(detail);

    // const newDetails = productForm.modelAndStripsForProduct.stripDetailsForProducts.filter(d=>())

    setProductForm({
      ...productForm,
      modelAndStripsForProduct: {
        ...productForm.modelAndStripsForProduct,
        stripDetailsForProducts: [
          ...productForm.modelAndStripsForProduct.stripDetailsForProducts.filter(d => (
            d.width !== detail.width || d.fabric.id !== detail.fabric.id
          ))
        ]
      }
    })
  }



  const onSubmit = (e) => {

    e.preventDefault();
    setErrors({});

    if (Object.keys(productValidationForm(productForm)).length === 0) {
      if (productForm.id) {
        updateProduct(productForm, setProductFormIsOpen);
      } else {
        addNewProduct(productForm, setProductFormIsOpen);
        console.log("Errors 0")
      }

    } else {
      setErrors(productValidationForm(productForm));
      console.log(errors);
    }


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
                  {
                    errors.nombre && <p className="text-danger">{errors.nombre}</p>
                  }
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
                      onChangeFabricForTira={onChangeFabricForTira}
                    />
                  }
                  {
                    errors.fabric && <p className="text-danger">{errors.fabric}</p>
                  }
                  <hr />

                  {/* MODELO */}

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

                  {
                    productForm.fabric.id != 0 &&
                    <button
                      className="btn btn-outline-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setPickModelIsOpen(true)
                      }}>
                      Seleccionar modelo
                    </button>
                  }
                  {
                    errors.model && <p className="text-danger">{errors.model}</p>
                  }
                  <hr />

                  {/* TIRAS */}

                  <h5>Tiras</h5>
                  {
                    errors.oneQuantityHasValueAtZero && <p className="text-danger">{errors.oneQuantityHasValueAtZero}</p>
                  }
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
                                productForm.modelAndStripsForProduct.stripDetailsForProducts &&


                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Id</th>
                                      <th scope="col">Img</th>
                                      <th scope="col">Ancho</th>
                                      <th scope="col">Eliminar</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      productForm.modelAndStripsForProduct.stripDetailsForProducts.map(detail => (
                                        detalle.tira.ancho === detail.width && (
                                          <Fragment key={detail.fabric.id}>
                                            <tr>
                                              <th scope="row">{detail.fabric.id}</th>
                                              {
                                                telasSeleccionadasParaTiras.length > 0 &&
                                                  telasSeleccionadasParaTiras.find(f => f.id === detail.fabric.id)?.img ?
                                                  <th>
                                                    <img
                                                      src={telasSeleccionadasParaTiras.find(f => f.id === detail.fabric.id).img}
                                                      alt=""
                                                      style={{ maxWidth: '20%' }}
                                                      className="img-thumbnail"
                                                    />
                                                  </th>
                                                  :
                                                  <th>
                                                    <img
                                                      src="src/db/imgs/image-not-found.jpg"
                                                      alt=""
                                                      style={{ maxWidth: '20%' }}
                                                      className="img-fluid"
                                                    />
                                                  </th>
                                              }
                                              <td>{detail.width}</td>
                                              <td>
                                                <button className="btn" onClick={(e) => onDeleteFabricForTira(e, detail)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                  </svg>
                                                </button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colSpan="4">
                                                <b>Cantidad:</b>
                                                <div className="row">
                                                  {detail.quantityPerSize && Object.entries(detail.quantityPerSize).map(([t, c]) => (
                                                    <div key={t} className="col">
                                                      {t}
                                                      <input
                                                        type="number"
                                                        name={t}
                                                        className="form-control"
                                                        step={0.1}
                                                        value={
                                                          productForm.modelAndStripsForProduct.stripDetailsForProducts.find(
                                                            d => d.fabric.id === detail.fabric.id && d.width === detail.width
                                                          )?.quantityPerSize[t] || 0
                                                        }
                                                        onChange={(e) => onChangeCantTirasPorTalle(e, detail.fabric.id, detail.width)}
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              </td>
                                            </tr>
                                          </Fragment>
                                        )
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
                                  telasSeleccionadas={productForm.modelAndStripsForProduct.stripDetailsForProducts}
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
                  <hr />
                  <h5>Imagen</h5>

                  {
                    <ImgSelector
                      onChangeFunction={onChangeImage} />

                  }
                  <hr />
                  <br />
                  <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>
                    {productForm.id && "Actualizar producto" || "Agregar producto"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}