import { useEffect, useState } from "react";
import { useInputModal } from "../hooks/inputs/useInputModal"
import { Input } from "./formComponents/Input";
import { SupplierSelect } from "./formComponents/SupplierSelect";
import { SelectStrings } from "./formComponents/SelectStrings";
import { useGancho } from "../hooks/inputs/useGancho";

const ganchoFormInitialState = {
  nombre: "",
  codigo: "",
  proveedor: {
    id: 0
  },
  detalle: "",
  tipoGancho: "",
  medida: "",
  material: "",
  color: "",
  cantPorPack: 0,
  precioPorPack: 0,
  precioUni: 0,
  stockPacks: 0
}

const validationGanchoForm = (ganchoForm) => {
  let errors = {};

  if (ganchoForm.proveedor.id === 0 || ganchoForm.proveedor.id === "Proveedor") {
    errors.proveedor = "El proveedor debe ser seleccionado";
  }

  if (ganchoForm.tipoGancho === "") {
    errors.tipoGancho = "Debe seleccionar tipo de gancho";
  }

  return errors;
}

export const GanchoForm = ({ ganchoFormData = ganchoFormInitialState, suppliers, formIsOpen }) => {

  // const [ganchos, setGanchos] = useState(ganchoFormData);

  const [ganchoForm, setGanchoForm] = useState(ganchoFormData);

  const [formErrors, setFormErrors] = useState({});

  const [tipoGanchosDb, setTipoGanchos] = useState([]);

  const [modifiedFields, setModifiedFields] = useState({});

  const { addGancho,
    updateGancho,
    dataEnumTipoGancho,
    setDataEnumTipoGancho,
    getTipoGanchos } = useGancho();


  useEffect(() => {

    if (tipoGanchosDb.length === 0) {
      getTipoGanchos(setTipoGanchos);
    }
  }, [])

  const onChangeGanchoForm = (e) => {
    const { name, value } = e.target;

    if (!ganchoForm.id) {
      if (name === "proveedor") {
        setGanchoForm({
          ...ganchoForm,
          [name]: {
            id: value
          }
        })
      } else {
        setGanchoForm({
          ...ganchoForm,
          [name]: value
        })
      }
    } else {
      if (name === "proveedor") {
        setGanchoForm({
          ...ganchoForm,
          [name]: {
            id: value
          }
        })
        setModifiedFields({
          ...modifiedFields,
          idProveedor: value
        })

      } else {
        setGanchoForm({
          ...ganchoForm,
          [name]: value
        })

        setModifiedFields({
          ...modifiedFields,
          [name]: value
        })
      }
    }

  }

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    if (Object.keys(validationGanchoForm(ganchoForm)).length === 0) {

      const nameGancho = "Gancho " + ganchoForm.medida + " " + ganchoForm.material + " " + ganchoForm.color + ` (${ganchoForm.tipoGancho})`;
      if (!ganchoForm.id) {
        ganchoForm.nombre = nameGancho;
      } else {
        modifiedFields.nombre = nameGancho;
      }

      if (!ganchoForm.id) {
        addGancho(ganchoForm);
      } else {
        updateGancho(modifiedFields, ganchoForm.id, formIsOpen)
      }


    } else {
      setFormErrors(validationGanchoForm(ganchoForm));
    }

  }
  return (
    <>
      <section className="container">
        <form action="">

          <Input
            name="codigo"
            value={ganchoForm.codigo}
            type="text"
            placeHolder="Codigo"
            onChangeInput={onChangeGanchoForm}
          />

          <SupplierSelect
            inputForm={ganchoForm}
            suppliers={suppliers}
            onChangeInputForm={onChangeGanchoForm}
          />
          {formErrors.proveedor && <p className="text-danger">{formErrors.proveedor}</p>}

          <Input
            name="detalle"
            value={ganchoForm.detalle}
            type="text"
            placeHolder="Detalles"
            onChangeInput={onChangeGanchoForm}
          />

          <SelectStrings
            array={tipoGanchosDb}
            defaultValue="Seleccionar tipo"
            initialValueText="Seleccionar tipo"
            name="tipoGancho"
            onChangeMethod={onChangeGanchoForm}
          />
          {formErrors.tipoGancho && <p className="text-danger">{formErrors.tipoGancho}</p>}


          <Input
            name="medida"
            value={ganchoForm.medida}
            type="text"
            placeHolder="Medida"
            onChangeInput={onChangeGanchoForm}
          />

          <Input
            name="material"
            value={ganchoForm.material}
            type="text"
            placeHolder="Material"
            onChangeInput={onChangeGanchoForm}
          />

          <Input
            name="color"
            value={ganchoForm.color}
            type="text"
            placeHolder="Color"
            onChangeInput={onChangeGanchoForm}
          />

          <Input
            name="cantPorPack"
            value={ganchoForm.cantPorPack}
            type="text"
            placeHolder="Cant por pack"
            onChangeInput={onChangeGanchoForm}
          />

          <Input
            name="precioPorPack"
            value={ganchoForm.precioPorPack}
            type="text"
            placeHolder="Precio por pack"
            onChangeInput={onChangeGanchoForm}
          />

          <Input
            name="precioUni"
            value={ganchoForm.precioUni}
            type="text"
            placeHolder="Precio unidad"
            onChangeInput={onChangeGanchoForm}
          />

          <Input
            name="stockPacks"
            value={ganchoForm.stockPacks}
            type="text"
            placeHolder="Stock packs"
            onChangeInput={onChangeGanchoForm}
          />

          <button className="btn btn-primary" onClick={onSubmit}>{!ganchoForm.id ? "Agregar gancho" : "Confirmar cambios"}</button>

        </form>
      </section>
    </>
  )
}