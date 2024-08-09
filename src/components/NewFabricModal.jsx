import { useEffect, useState } from "react"
import { useSuppliers } from "../hooks/useSuppliers";

const newFabricFormInitialState = {
  codigo: "",
  nombre: "",
  color: "",
  tipo: "",
  temporada: "",
  id: "",
  proveedor: {
    id: 0
  },
  stock: 0,
  codeBarNumb: "",
  precio: 0,
  tags: "",
  img: null
}

const fabricValidationForm = (fabricForm) => {
  let errors = {};


  // if (!fabricForm.color.trim()) {
  //   errors.color = "El color es un campo obligatorio"
  // }


  if (fabricForm.proveedor.id === 0 || fabricForm.proveedor.id === "Proveedor") {
    errors.proveedor = "El proveedor es un campo obligatorio"
  }

  return errors;

}

export const NewFabricModal = ({
  setFabricModalIsOpen,
  addNewFabric,
  setEditFormIsOpen,
  fabric = newFabricFormInitialState,
  editFabric
}) => {

  console.log(fabric)
  const [fabricForm, setFabricForm] = useState(fabric);

  const [simplestSuppliers, setSimplestSuppliers] = useState([]);

  const [fabricOnEdit, setFabricOnEdit] = useState({});

  const [errors, setErrors] = useState({});

  const { getSimplestSuppliers } = useSuppliers();

  useEffect(() => {
    if (simplestSuppliers.length === 0 || fabric.id) {
      getSimplestSuppliers(setSimplestSuppliers, setFabricOnEdit, fabricForm);
    }

  }, [])

  const onCloseFabricModalForm = () => {
    if (fabricForm.id) {
      setEditFormIsOpen(false);
    } else {
      setFabricModalIsOpen(false);
    }
  }

  const onChangeFabricForm = (e) => {
    if (e.target.name === 'img') {
      const file = e.target.files[0]
      setFabricForm({
        ...fabricForm,
        [e.target.name]: file
      })
    } else
      if (e.target.name === "proveedor") {
        setFabricForm({
          ...fabricForm,
          [e.target.name]: {
            id: e.target.value
          }
        })
      } else if (e.target.name === "precio") {
        setFabricForm({
          ...fabricForm,
          [e.target.name]: e.target.value
        })
      } else {
        setFabricForm({
          ...fabricForm,
          [e.target.name]: e.target.value
        })
      }
  }

  const onSubmit = () => {
    setErrors({})
    if (Object.keys(fabricValidationForm(fabricForm)).length === 0) {
      if (!fabricForm.id) {
        addNewFabric(fabricForm);
      } else {
        // console.log("else{} on edit: " + fabricForm)
        editFabric(fabricForm)
        onCloseFabricModalForm();
      }
    } else {
      setErrors(fabricValidationForm(fabricForm));
      console.log(errors)
    }
  }

  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nueva tela</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCloseFabricModalForm}></button>
            </div>
            <div className="modal-body">

              <div className="container">


                <form action="" className="form-floating">

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputNombre"
                      name="nombre"
                      value={fabricForm.nombre}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputNombre" className="h6">Nombre</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputColor"
                      name="color"
                      value={fabricForm.color}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputColor" className="h6">Color</label>
                    {
                      errors.color && <p className="text-danger">{errors.color}</p>
                    }
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputCodDis"
                      name="codigo"
                      value={fabricForm.codigo}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputCodDis" className="h6">Código distribuidor</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="select"
                      className="form-control"
                      id="floatingInputTipo"
                      name="tipo"
                      value={fabricForm.tipo}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputTipo" className="h6">Tipo</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputTemporada"
                      name="temporada"
                      value={fabricForm.temporada}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputTemporada" className="h6">Temporada</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInputStock"
                      name="stock"
                      value={fabricForm.stock}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputStock" className="h6">Stock inicial en metros</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInputStock"
                      name="precio"
                      value={fabricForm.precio}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputStock" className="h6">Precio/metro</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputTags"
                      name="tags"
                      value={fabricForm.tags}
                      onChange={onChangeFabricForm}
                    />
                    <label htmlFor="floatingInputTags" className="h6">Tags separados por coma. Ej: lima, verde, brillante</label>
                  </div>

                  {
                    fabricOnEdit[0] ?
                      <select
                        className="form-select form-select-sm"
                        name="proveedor"
                        defaultValue={fabric.proveedor.id}
                        onChange={onChangeFabricForm}
                      >
                        <option value={fabricOnEdit.id}>{fabricOnEdit && fabricOnEdit[0].empresa}</option>
                        {simplestSuppliers.map(sup => {
                          if (sup.id !== fabric.proveedor.id) {
                            return (<option key={sup.id} value={sup.id}>
                              {sup.empresa}
                            </option>)
                          }
                        })}
                      </select>
                      :
                      <select
                        className="form-select form-select-sm"
                        name="proveedor"
                        defaultValue="Proveedor"
                        onChange={onChangeFabricForm}
                      >
                        <option value="Proveedor">Proveedor</option>
                        {simplestSuppliers.map(sup => (
                          <option key={sup.id} value={sup.id}>
                            {sup.empresa}
                          </option>
                        ))}
                      </select>
                  }
                  {
                    errors.proveedor && <p className="text-danger">{errors.proveedor}</p>
                  }

                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label h6 mt-3">Seleccionar imagen</label>
                    <input
                      className="form-control mt-1"
                      type="file"
                      id="formFile"
                      name="img"
                      // value={fabricForm.img}
                      onChange={onChangeFabricForm}
                    />
                  </div>

                </form>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button type="button" className="btn btn-primary" onClick={onSubmit}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}