import { useState } from "react"
import { SupplierSelect } from "./formComponents/SupplierSelect";
import { Input } from "./formComponents/Input";
import { useInputModal } from "../hooks/inputs/useInputModal";
import { InputModalContext } from "../context/InputModalContext";
import { useArgolla } from "../hooks/inputs/useArgolla";

const argollaFormInitialState = {
  nombre: "",
  codigo: "",
  proveedor: {
    id: 0
  },
  detalle: "",
  // forma: "",
  circunferenciaInterna: "",
  circunferenciaExterna: "",
  material: "",
  color: "",
  // cantPorPack: 0,
  // precioPorPack: 0,
  precioUni: 0,
  stock: 0
}

const validationArgollaForm = (argollaForm) => {

  let errors = {};

  if (argollaForm.proveedor.id === 0 && argollaForm.proveedor !== "Proveedor") {
    errors.proveedor = "Elegir proveedor"
  }


  return errors;

}

export const ArgollaForm = ({ argollaFormData = argollaFormInitialState, suppliers, formIsOpen }) => {

  const [argollaForm, setArgollaForm] = useState(argollaFormData);

  const [argollaFormErrors, setArgollaFormErrors] = useState({});

  const [modifiedFields, setModifiedFields] = useState({});

  const { addNewArgolla, updateArgolla } = useArgolla();

  const onChangeArgollaForm = (e) => {

    const { name, value } = e.target;

    if (name === "proveedor") {
      if (!argollaForm.id) {
        setArgollaForm({
          ...argollaForm,
          [name]: {
            id: value
          }
        })
      } else {
        setModifiedFields({
          ...modifiedFields,
          idProveedor: value
        })
        setArgollaForm({
          ...argollaForm,
          [name]: {
            id: value
          }
        })
      }
    } else {
      if (!argollaForm.id) {
        setArgollaForm({
          ...argollaForm,
          [name]: value
        })
      } else {
        setModifiedFields({
          ...modifiedFields,
          [name]: value
        })
        setArgollaForm({
          ...argollaForm,
          [name]: value
        })

      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setArgollaFormErrors({});
    if (Object.keys(validationArgollaForm(argollaForm)).length === 0) {

      const nameArgolla = "Argolla " + argollaForm.circunferenciaInterna.trim() + "/" + argollaForm.circunferenciaInterna.trim();
      argollaForm.nombre = nameArgolla;

      if (argollaForm.id) {
        modifiedFields.nombre = nameArgolla;
      }

      if (!argollaForm.id) {
        addNewArgolla(argollaForm);
      } else {
        updateArgolla(modifiedFields, argollaForm.id, formIsOpen);
      }

    } else {
      setArgollaFormErrors(validationArgollaForm(argollaForm));
    }
  }

  return (
    <>

      <div className="container">

        <form action="">

          <Input
            name="codigo"
            value={argollaForm.codigo}
            type="text"
            placeHolder="Codigo"
            onChangeInput={onChangeArgollaForm}
          />

          <SupplierSelect
            inputForm={argollaForm}
            suppliers={suppliers}
            onChangeInputForm={onChangeArgollaForm}
            error={argollaFormErrors.proveedor}
          />
          {argollaFormErrors.proveedor && <p className="text-danger">{argollaFormErrors.proveedor}</p>}


          <Input
            name="circunferenciaInterna"
            value={argollaForm.circunferenciaInterna}
            type="text"
            placeHolder="Circunferencia interna Ej: 10mm"
            onChangeInput={onChangeArgollaForm}
          />
          <Input
            name="circunferenciaExterna"
            value={argollaForm.circunferenciaExterna}
            type="text"
            placeHolder="Circunferencia externa Ej: 10mm"
            onChangeInput={onChangeArgollaForm}
          />
          {/* <Input
            name="forma"
            value={argollaForm.forma}
            type="text"
            placeHolder="Forma"
            onChangeInput={onChangeArgollaForm}
          /> */}
          <Input
            name="material"
            value={argollaForm.material}
            type="text"
            placeHolder="Material"
            onChangeInput={onChangeArgollaForm}
          />
          <Input
            name="color"
            value={argollaForm.color}
            type="text"
            placeHolder="Color"
            onChangeInput={onChangeArgollaForm}
          />
          {/* <Input
            name="cantPorPack"
            value={argollaForm.cantPorPack}
            type="number"
            placeHolder="Cant por pack"
            onChangeInput={onChangeArgollaForm}
          /> */}
          {/* <Input
            name="precioPorPack"
            value={argollaForm.precioPorPack}
            type="number"
            placeHolder="Precio por pack"
            onChangeInput={onChangeArgollaForm}
          /> */}
          <Input
            name="precioUni"
            value={argollaForm.precioUni}
            type="number"
            placeHolder="Precio unidad"
            onChangeInput={onChangeArgollaForm}
          />
          <Input
            name="stock"
            value={argollaForm.stock}
            type="number"
            placeHolder="Stock"
            onChangeInput={onChangeArgollaForm}
          />
          <Input
            name="detalle"
            value={argollaForm.detalle}
            type="text"
            placeHolder="Detalles"
            onChangeInput={onChangeArgollaForm}
          />

          <button className="btn btn-primary" onClick={onSubmit}>{!argollaForm.id ? "Agregar argolla" : "Confirmar cambios"}</button>

        </form>

      </div>

    </>
  )
}