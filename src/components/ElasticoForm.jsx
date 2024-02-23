import { useState } from "react"

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

export const ElasticoForm = ({ suppliers, elasticoFormData = newElasticoInitialForm }) => {

  const [elasticoForm, setElasticoForm] = useState(elasticoFormData);

  const [formErrors, setFormErrors] = useState({});

  const onChangeElasticoForm = (e) => {

    const { name, value } = e.target;

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
  }

  const onSubmit = () => {

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
            <label htmlFor="elasticoAncho">Ancho</label>
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
            {formErrors.material && <p className="text-danger">{formErrors.material}</p>}
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

          <button className="btn btn-primary" onClick={onSubmit}>Agregar elastico</button>

        </form>
      </div>
    </>
  )
}