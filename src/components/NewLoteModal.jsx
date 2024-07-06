import { useContext, useEffect, useState } from "react"
import { ProductMultiSelector } from "./ProductMultiSelectior";
import { ProductSelectedAtFormCard } from "./ProductSelectedAtFormCard";
import { LoteContext } from "../context/LoteContext";
import { FetchTopAlert } from "./alerts/FetchTopAlert";

const newLoteFormInitialValue = {
  products: [],
  workShop: {
    id: 0
  },
  additionalDetails: ""
}

const loteValidationForm = (loteForm) => {
  let errors = {};
  if (loteForm.products.length === 0) {
    errors.products = "Seleccionar productos"
  }
  if (loteForm.workShop.id === 0) {
    errors.workshop = "Seleccionar un taller"
  }

  return errors;
}

export const NewLoteModal = ({ modalIsOpen, loteFormData = newLoteFormInitialValue, setNewLoteIsOpen }) => {

  const [loteForm, setLoteForm] = useState(loteFormData);

  const [productPickerIsOpen, setProductPickerIsOpen] = useState(false);

  const [productsSelected, setProductsSelected] = useState([]);

  const [workshops, setWorkshops] = useState([]);

  const [loteErrors, setLoteErrors] = useState({});

  const { dispatchAddQueueLote,
    setLoteDbHasChanged } = useContext(LoteContext)

  // useEffect(() => {
  //   setLoteForm({
  //     ...loteForm,
  //     products: productsSelected
  //   })
  // }, [productsSelected])


  useEffect(() => {
    const findWorkshops = async () => {
      const res = await fetch('http://localhost:8080/workshops');

      if (res.ok) {
        const workshopsJson = await res.json();
        setWorkshops(workshopsJson);
      }
    }
    findWorkshops();
  }, [])

  const onChangeProduct = (id) => {

    loteForm.products.some(p => p.id === id) ?

      setLoteForm({
        ...loteForm,
        products: [
          ...loteForm.products.filter(p => p.id !== id)
        ]
      })
      :
      setLoteForm({
        ...loteForm,
        products: [
          ...loteForm.products,
          { id }
        ]
      })
  }

  const onChangeTaller = (e) => {
    const { value } = e.target;
    setLoteForm({
      ...loteForm,
      workShop: {
        id: value
      }
    })
  }

  const onChangeDetalle = (e) => {
    const { value } = e.target;

    setLoteForm({
      ...loteForm,
      additionalDetails: value
    })
  }

  const onSubmit = () => {
    setLoteErrors({});
    if (Object.keys(loteValidationForm(loteForm)).length === 0) {
      addLote(loteForm);
    } else {
      setLoteErrors(loteValidationForm(loteForm));
      console.log(loteErrors)
    }

  }

  const addLote = async (lote) => {
    try {

      const res = await fetch('http://localhost:8080/lotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lote)
      })


      if (res.ok) {
        const resJson = await res.json();
        setLoteDbHasChanged("Lote agregado con éxito")
        setTimeout(() => {
          setLoteDbHasChanged("")
        }, 5000)
        setNewLoteIsOpen(false);
        // dispatchAddQueueLote
      }

    } catch (error) {
      console.log("error: " + error)
    }

  }



  return (
    <>

      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo lote</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => modalIsOpen(false)}
              ></button>
            </div>
            <div className="modal-body">

              <div className="container mb-4">
                <div className="d-flex column gap-3 mb-3">

                  <h4>Productos</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => setProductPickerIsOpen(true)}
                  >Seleccionar
                  </button>
                </div>
                {
                  productsSelected && productsSelected.map(p => (
                    <ProductSelectedAtFormCard
                      key={p.id}
                      product={p}
                    />
                  ))
                }
                <hr />
                {
                  productPickerIsOpen &&
                  <ProductMultiSelector
                    modalIsOpen={setProductPickerIsOpen}
                    productsSelected={productsSelected}
                    setProductsSelected={setProductsSelected}
                    onChangeProduct={onChangeProduct}
                  />
                }
                {
                  loteErrors.products && <p className="text-danger">{loteErrors.products}</p>
                }
              </div>

              <div className="container mb-4">
                <h4>Taller</h4>
                <hr />
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                  defaultValue={null}
                  onChange={onChangeTaller}
                >
                  <option value={0}>Seleccionar taller</option>
                  {
                    workshops.map(taller => (
                      <option key={taller.id} value={taller.id}>{taller.name}</option>

                    ))
                  }
                  {/* <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </select>
                {
                  loteErrors.workshop && <p className="text-danger">{loteErrors.workshop}</p>
                }
              </div>

              <div className="container mb-4">
                <h4>Detalles</h4>
                <hr />
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    onChange={onChangeDetalle}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Detalles</label>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onSubmit}
              >Agregar</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}