import { useState } from "react"
import { useElastico } from "../hooks/inputs/useElastico";

const newElasticoInitialForm = {
  nombre: "",
  codigo: "",
  proveedor: {
    id: 0
  },
  detalle: "",
  ancho: "",
  material: "",
  color: "",
  precioRollo: 0,
  mtsPorRollo: 0,
  precioMtr: 0,
  stockEnRollos: 0
}

const validationElasticoForm = (elastico) => {
  let errors = {};

  if (elastico.proveedor.id === 0) {
    errors.proveedor = "Debe seleccionar el proveedor del insumo"
  }

  if (!elastico.ancho.trim()) {
    errors.ancho = "El ancho del elástico es un campo obligatorio"
  } else if (elastico.ancho.trim().length < 2) {
    errors.ancho = "Se debe indicar el numero y la unidad de medida"
  }

  if (!elastico.color.trim()) {
    errors.color = "Ingresar el color del elástico"
  }

  return errors;
}

export const ElasticoForm = ({ suppliers, elasticoFormData = newElasticoInitialForm, formIsOpen }) => {

  const [elasticoForm, setElasticoForm] = useState(elasticoFormData);

  const [formErrors, setFormErrors] = useState({});

  const [modifiedFields, setModifiedFields] = useState({});

  const { addElastico, updateElastico } = useElastico();

  const onChangeElasticoForm = (e) => {

    const { name, value } = e.target;

    if (!elasticoForm.proveedor.id) {
      if (name === "proveedor") {
        setElasticoForm({
          ...elasticoForm,
          [name]: {
            id: value
          }
        })
      } else {
        setElasticoForm({
          ...elasticoForm,
          [name]: value
        })
      }
    } else {
      if (name === "proveedor") {
        setElasticoForm({
          ...elasticoForm,
          [name]: {
            id: value
          }
        })
        setModifiedFields({
          ...modifiedFields,
          [name]: {
            id: value
          }
        })
      } else {
        setModifiedFields({
          ...modifiedFields,
          [name]: value
        })
        setElasticoForm({
          ...elasticoForm,
          [name]: value
        })
      }
    }

  }

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    if (Object.keys(validationElasticoForm(elasticoForm)).length === 0) {
      const nameElastico = "Elastico " + elasticoForm.ancho.trim() + " " + elasticoForm.color.trim();
      elasticoForm.nombre = nameElastico;

      if (elasticoForm.id) {
        modifiedFields.nombre = nameElastico;
      }

      if (!elasticoForm.id) {
        addElastico(elasticoForm);
      } else {
        updateElastico(modifiedFields, elasticoForm.id, formIsOpen);
      }
    } else {
      setFormErrors(validationElasticoForm(elasticoForm));
    }
  }

  return (
    <>
      <div className="container">
        <form action="">

          <div className="form-floating mb-3">
            <input
              name="codigo"
              value={elasticoForm.codigo}
              type="text"
              className="form-control required"
              id="elasticoCodigo"
              placeholder="codigo"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoCodigo">Codigo de fabrica</label>
          </div>

          {
            elasticoForm.id && elasticoForm.proveedor && elasticoForm.proveedor.id ?
              <select
                defaultValue={elasticoForm.proveedor ? elasticoForm.proveedor.id : undefined}
                name="proveedor"
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                onChange={onChangeElasticoForm}
              >
                <option value={elasticoForm.proveedor.id || ""}>{elasticoForm.proveedor && elasticoForm.proveedor.empresa}</option>
                {
                  suppliers.map(sup => {
                    if (sup.id !== elasticoForm.proveedor.id) {
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
                onChange={onChangeElasticoForm}
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
            <input
              name="ancho"
              value={elasticoForm.ancho}
              type="text"
              className="form-control"
              id="elasticoAncho"
              placeholder="ancho"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoAncho">Ancho Ej: 7mm</label>
            {formErrors.ancho && <p className="text-danger">{formErrors.ancho}</p>}

          </div>

          <div className="form-floating mb-3">
            <input
              name="material"
              value={elasticoForm.material}
              type="text"
              className="form-control"
              id="elasticoMaterial"
              placeholder="material"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoMaterial">Material</label>
            {/* {formErrors.material && <p className="text-danger">{formErrors.material}</p>} */}
          </div>

          <div className="form-floating mb-3">
            <input
              name="color"
              value={elasticoForm.color}
              type="text"
              className="form-control"
              id="elasticoColor"
              placeholder="color"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoColor">Color</label>
            {formErrors.color && <p className="text-danger">{formErrors.color}</p>}
          </div>

          <div className="form-floating mb-3">
            <input
              name="precioRollo"
              value={elasticoForm.precioRollo}
              type="number"
              className="form-control"
              id="elasticoPrecioRollo"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoPrecioRollo">Precio rollo</label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="mtsPorRollo"
              value={elasticoForm.mtsPorRollo}
              type="number"
              className="form-control"
              id="elasticoMtsPorRollo" onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoMtsPorRollo">Metros por rollo</label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="precioMtr"
              value={elasticoForm.precioMtr}
              type="number"
              className="form-control"
              id="elasticoPrecioMtr"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoPrecioMtr">Precio por metro</label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="stockEnRollos"
              value={elasticoForm.stockEnRollos}
              type="number"
              className="form-control"
              id="elasticoStockEnRollos"
              onChange={onChangeElasticoForm}
            />
            <label htmlFor="elasticoStockEnRollos">Stock rollos</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              name="detalle"
              value={elasticoForm.detalle}
              className="form-control"
              id="elasticoDetalle"
              style={{ height: "100px" }}
              onChange={onChangeElasticoForm}
            ></textarea>
            <label htmlFor="elasticoDetalle">Detalles adicionales</label>
          </div>

          <button className="btn btn-primary" onClick={onSubmit}>{!elasticoForm.id ? "Agregar elastico" : "Confirmar cambios"}</button>

        </form>
      </div>
    </>
  )
}