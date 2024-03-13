import { useState } from "react"
import { Input } from "./formComponents/Input"
import { SupplierSelect } from "./formComponents/SupplierSelect";
import { useInputModal } from "../hooks/inputs/useInputModal";
import { useAplique } from "../hooks/inputs/useAplique";

const apliqueFormInitialState = {
  nombre: "",
  codigo: "",
  proveedor: {
    id: 0
  },
  detalle: "",
  color: "",
  cantPorPack: 0,
  precioPorPack: 0,
  precioUnidad: 0,
  stockPacks: 0
}

const validationApliqueForm = (aplique) => {
  let errors = {};

  if (!aplique.nombre.trim()) {
    errors.nombre = "Ingrese un nombre identificador. Ej Chapita shell"
  }

  if (aplique.proveedor.id === 0 || aplique.proveedor.id === "Proveedor") {
    errors.proveedor = "Seleccionar proveedor del aplique"
  }
  return errors;
}

export const ApliqueForm = ({ apliqueFormData = apliqueFormInitialState, suppliers, formIsOpen }) => {

  const [apliqueForm, setApliqueForm] = useState(apliqueFormData);

  const [modifiedFields, setModifiedFields] = useState({});

  const [formErrors, setFormErrors] = useState({});

  const { addAplique, updateAplique } = useAplique();

  const onChangeApliqueForm = (e) => {
    const { name, value } = e.target;
    if (!apliqueForm.id) {
      if (name === 'proveedor') {
        setApliqueForm({
          ...apliqueForm,
          proveedor: {
            id: value
          }
        })
      } else {
        setApliqueForm({
          ...apliqueForm,
          [name]: value
        })
      }
    } else {
      if (name === 'proveedor') {
        setApliqueForm({
          ...apliqueForm,
          proveedor: {
            id: value
          }
        })
        setModifiedFields({
          ...modifiedFields,
          idProveedor: value
        })
      } else {
        setApliqueForm({
          ...apliqueForm,
          [name]: value
        });
        setModifiedFields({
          ...modifiedFields,
          [name]: value
        })
      }
    }
  }





  const onSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(validationApliqueForm(apliqueForm)).length === 0) {
      if (!apliqueForm.id) {
        addAplique(apliqueForm);
      } else {
        updateAplique(apliqueForm.id, modifiedFields, formIsOpen)
      }
    } else {
      setFormErrors({});
      setFormErrors(validationApliqueForm(apliqueForm));
    }
  }


  return (
    <>
      <div className="container">
        <form action="">
          <Input
            name="nombre"
            placeHolder="Nombre"
            type="text"
            value={apliqueForm.nombre}
            onChangeInput={onChangeApliqueForm}
          />
          {formErrors.nombre && <p className="text-danger">{formErrors.nombre}</p>}

          <Input
            name='codigo'
            placeHolder='Codigo'
            type='text'
            value={apliqueForm.codigo}
            onChangeInput={onChangeApliqueForm}
          />

          <SupplierSelect
            inputForm={apliqueForm}
            suppliers={suppliers}
            onChangeInputForm={onChangeApliqueForm}
          />
          {formErrors.proveedor && <p className="text-danger">{formErrors.proveedor}</p>}


          <Input
            name='detalle'
            placeHolder='Detalles'
            type='text'
            value={apliqueForm.detalle}
            onChangeInput={onChangeApliqueForm}
          />

          <Input
            name='color'
            placeHolder='Color'
            type='text'
            value={apliqueForm.color}
            onChangeInput={onChangeApliqueForm}
          />

          <Input
            name='cantPorPack'
            placeHolder='Cantidad por pack'
            type='number'
            value={apliqueForm.cantPorPack}
            onChangeInput={onChangeApliqueForm}
          />
          <Input
            name='precioPorPack'
            placeHolder='Precio por pack'
            type='number'
            value={apliqueForm.precioPorPack}
            onChangeInput={onChangeApliqueForm}
          />
          <Input
            name='precioUnidad'
            placeHolder='Precio unidad'
            type='number'
            value={apliqueForm.precioUnidad}
            onChangeInput={onChangeApliqueForm}
          />
          <Input
            name='stockPacks'
            placeHolder='Stock packs'
            type='number'
            value={apliqueForm.stockPacks}
            onChangeInput={onChangeApliqueForm}
          />

          <button className="btn btn-primary" onClick={onSubmit}>{!apliqueForm.id ? "Agregar aplique" : "Confirmar cambios"}</button>

        </form>
      </div>
    </>
  )
}