import { useContext, useEffect, useState } from "react"
import { EtiquetaContext } from "../context/EtiquetaContext"
import { Input } from "./formComponents/Input";
import { SupplierSelect } from "./formComponents/SupplierSelect";
import { InputModalContext } from "../context/InputModalContext";
import { useEtiqueta } from "../hooks/inputs/useEtiqueta";

const newEtiquetaInitialState = {
  nombre: "",
  codigo: "",
  proveedor: {
    id: 0
  },
  detalle: "",
  marca: "",
  precioUnidad: 0,
  stock: ""
}

const validationEtiquetaForm = (etiqueta) => {
  let errors = {}
  if (etiqueta.proveedor.id === 0 || etiqueta.proveedor === "Proveedor") {
    errors.proveedor = "Seleccionar proveedor"
  }

  if (!etiqueta.marca.trim()) {
    errors.marca = "Se debe ingresar para que marca es al etiqueta"
  }

  return errors;
}

export const EtiquetaForm = ({ suppliers, etiquetaFormData = newEtiquetaInitialState, formIsOpen }) => {

  const [etiquetaForm, setEtiquetaForm] = useState(etiquetaFormData);

  const [formErrors, setFormErrors] = useState({});

  const [modifiedFields, setModifiedFields] = useState({});

  const { addEtiqueta, updateEtiqueta } = useEtiqueta()


  const onChange = (e) => {
    const { name, value } = e.target;

    if (!etiquetaForm.id) {
      if (name === "proveedor") {
        setEtiquetaForm({
          ...etiquetaForm,
          proveedor: {
            id: value
          }
        })
      } else {
        setEtiquetaForm({
          ...etiquetaForm,
          [name]: value
        })
      }
    } else {
      if (name === "proveedor") {
        setModifiedFields({
          ...modifiedFields,
          idProveedor: value
        })
        setEtiquetaForm({
          ...etiquetaForm,
          proveedor: {
            id: value
          }
        })
      } else {
        setModifiedFields({
          ...modifiedFields,
          [name]: value
        })
        setEtiquetaForm({
          ...etiquetaForm,
          [name]: value
        })
      }
    }
  }


  const onSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(validationEtiquetaForm(etiquetaForm)).length === 0) {
      if (etiquetaForm.id) {
        modifiedFields.nombre = "Etiqueta " + etiquetaForm.marca;
      } else {
        etiquetaForm.nombre = "Etiqueta " + etiquetaForm.marca;
      }


      if (!etiquetaForm.id) {
        addEtiqueta(etiquetaForm);
      } else {
        updateEtiqueta(etiquetaForm.id, modifiedFields, formIsOpen)
      }

    } else {
      setFormErrors({})
      setFormErrors(validationEtiquetaForm(etiquetaForm));
    }
  }

  return (
    <>
      <div className="container">
        <form action="">

          <Input
            name="codigo"
            type="text"
            placeHolder="Codigo"
            value={etiquetaForm.codigo}
            onChangeInput={onChange}
          />

          <SupplierSelect
            inputForm={etiquetaForm}
            suppliers={suppliers}
            onChangeInputForm={onChange}
          />
          {formErrors.proveedor && <p className="text-danger">{formErrors.proveedor}</p>}


          <Input
            name="detalle"
            placeHolder="Detalle"
            type="text"
            value={etiquetaForm.detalle}
            onChangeInput={onChange}
          />

          <Input
            name="marca"
            type="text"
            placeHolder="Marca ej: ISLA"
            value={etiquetaForm.marca}
            onChangeInput={onChange}
          />
          {formErrors.marca && <p className="text-danger">{formErrors.marca}</p>}


          <Input
            name="precioUnidad"
            type="number"
            value={etiquetaForm.precioUnidad}
            placeHolder="Precio unidad"
            onChangeInput={onChange}
          />

          <Input
            name="stock"
            type="number"
            placeHolder="Stock"
            value={etiquetaForm.stock}
            onChangeInput={onChange}
          />

          <button className="btn btn-primary" onClick={onSubmit}>{!etiquetaForm.id ? "Agregar etiqueta" : "Confirmar cambios"}</button>

        </form>
      </div>
    </>
  )
}