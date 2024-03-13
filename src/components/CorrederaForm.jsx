import { useEffect, useState } from "react"
import { useCorredera } from "../hooks/inputs/useCorredera";

const newCorrederaInitialForm = {
  nombre: "",
  codigo: "",
  proveedor: {
    id: 0
  },
  detalle: "",
  forma: "",
  medida: "",
  material: "",
  color: "",
  cantPorPack: 0,
  precioPorPack: 0,
  precioUni: 0,
  stockPacks: 0
}


const validationCorrederaForm = (corredera) => {
  let errors = {};


  if (corredera.proveedor.id == 0 || corredera.proveedor.id === "Proveedor") {
    errors.proveedor = "Este campo es obligatorio"
  }

  if (!corredera.medida.trim()) {
    errors.medida = "La medida de la corredera es un cambo obligatorio"
  }

  if (!corredera.material.trim()) {
    errors.material = "El material de la corredera es obligatorio"
  }

  return errors;

}

export const CorrederaForm = ({ suppliers, correderaFormData = newCorrederaInitialForm, formIsOpen }) => {

  const { addNewCorredera, updateCorredera } = useCorredera();

  const [correderaForm, setCorrederaForm] = useState(correderaFormData)

  const [modifiedFields, setModifiedFields] = useState({ nombre: "", });

  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    if (correderaForm.id) {
      correderaForm.proveedor.id = correderaFormData.proveedor.id
    }
  }, [])


  const onChangeCorrederaForm = (e) => {

    const { name, value } = e.target;

    if (name === "proveedor") {
      setCorrederaForm({
        ...correderaForm,
        [name]: {
          id: value
        }
      })
      if (correderaForm.id) {
        setModifiedFields({
          ...modifiedFields,
          [name]: {
            id: value
          }
        })
      }
    } else {
      setCorrederaForm({
        ...correderaForm,
        [name]: value
      })
      if (correderaForm.id) {
        setModifiedFields({
          ...modifiedFields,
          [name]: value
        })
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors({})
    if (Object.keys(validationCorrederaForm(correderaForm)).length === 0) {
      const nameCorredera = "Corredera " + correderaForm.medida.trim() + " " + correderaForm.material.trim();
      if (correderaForm.id) {
        modifiedFields.nombre = nameCorredera
      } else {
        correderaForm.nombre = nameCorredera;
      }

      if (!correderaForm.id) {
        addNewCorredera(correderaForm);
      } else {
        updateCorredera(modifiedFields, correderaForm.id, formIsOpen);
      }

    } else {
      setFormErrors(validationCorrederaForm(correderaForm));
    }
  }

  return (
    <>
      <div className="container">

        <form action="">

          <div className="form-floating mb-3">
            <input
              name="codigo"
              value={correderaForm.codigo}
              type="text"
              className="form-control required"
              id="correderaCodigo"
              placeholder="codigo"
              onChange={onChangeCorrederaForm}
            />
            <label htmlFor="correderaCodigo">Codigo de fabrica</label>
          </div>

          {
            correderaForm.id && correderaForm.proveedor && correderaForm.proveedor.id ?
              <select
                defaultValue={correderaForm.proveedor ? correderaForm.proveedor.id : undefined}
                name="proveedor"
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                onChange={onChangeCorrederaForm}
              >
                <option value={correderaForm.proveedor.id || ""}>{correderaForm.proveedor && correderaForm.proveedor.empresa}</option>
                {
                  suppliers.map(sup => {
                    if (sup.id !== correderaForm.proveedor.id) {
                      return <option key={sup.id} value={sup.id}>{sup.empresa}</option>
                    }
                  })
                }
              </select>

              :

              <select
                defaultValue="Proveedor"
                name="proveedor"
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                onChange={onChangeCorrederaForm}
              >
                <option value="Proveedor">Seleccionar proveedor</option>
                {
                  suppliers.map(sup => (

                    <option key={sup.id} value={sup.id}>{sup.empresa}</option>
                  ))
                }
              </select>
          }

          {formErrors.proveedor && <p className="text-danger">{formErrors.proveedor}</p>}

          <div className="form-floating mb-3">
            <input name="forma" value={correderaForm.forma} type="text" className="form-control" id="correderaForma" placeholder="forma" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaForma">Forma</label>
          </div>

          <div className="form-floating mb-3">
            <input name="medida" value={correderaForm.medida} type="text" className="form-control" id="correderaMedida" placeholder="medida" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaMedida">Medida  Ej: 20mm</label>
            {formErrors.medida && <p className="text-danger">{formErrors.medida}</p>}
          </div>

          <div className="form-floating mb-3">
            <input name="material" value={correderaForm.material} type="text" className="form-control" id="correderaMaterial" placeholder="material" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaMaterial">Material</label>
            {formErrors.material && <p className="text-danger">{formErrors.material}</p>}
          </div>

          <div className="form-floating mb-3">
            <input name="color" value={correderaForm.color} type="text" className="form-control" id="correderaColor" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaColor">Color</label>
          </div>

          <div className="form-floating mb-3">
            <input name="cantPorPack" value={correderaForm.cantPorPack} type="number" className="form-control" id="correderaCantPorPack" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaCantPorPack">Cantidad de correderas por bolsa o pack</label>
          </div>

          <div className="form-floating mb-3">
            <input name="precioPorPack" value={correderaForm.precioPorPack} type="number" className="form-control" id="correderaPrecioPorPack" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaPrecioPorPack">Precio por bolsa o pack</label>
          </div>

          <div className="form-floating mb-3">
            <input name="precioUni" value={correderaForm.precioUni} type="number" className="form-control" id="correderaPrecioUni" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaPrecioUni">Precio unitario</label>
          </div>

          <div className="form-floating mb-3">
            <input name="stockPacks" value={correderaForm.stockPacks} type="number" className="form-control" id="correderaStockPacks" onChange={onChangeCorrederaForm} />
            <label htmlFor="correderaStockPacks">Stock packs</label>
          </div>

          <div className="form-floating mb-3">
            <textarea name="detalle" value={correderaForm.detalle} className="form-control" id="floatingTextarea2Disabled" style={{ height: "100px" }} onChange={onChangeCorrederaForm} ></textarea>
            <label htmlFor="floatingTextarea2Disabled">Detalles adicionales</label>
          </div>


          <button className="btn btn-primary" onClick={onSubmit}>Agregar corredera</button>



        </form>

      </div>
    </>
  )
}