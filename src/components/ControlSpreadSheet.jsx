import { useEffect, useState } from "react"
import { AmountPerSizeTable } from "./AmountPerSizeTable";
import { useControlSpreadsheet } from "../hooks/lotes/useControlSpreadsheet";
import { errorAlert } from "./alerts/errorAlert";

const controlSpreadSheetValidator = (sheet) => {
  let errors = {};
  sheet.amountPerSizeForProductDTO.forEach(a => (
    Object.values(a.amountPerSize).forEach(value => {
      console.log(value)
      if (value < 0 || value === "" || value === null || value === undefined) {
        errors.invalidAmount = "Todos los valores deben ser igual o mayores que cero"
      }
    })
  ));

  return errors;

}

export const ControlSpreadSheet = ({ controlSpreadSheet, setControlSpreadSheet, setControlSpreadSheetIsOpen }) => {

  const [controlSpreadSheetForm, setControlSpreadSheetForm] = useState();

  const [editMode, setEditMode] = useState(false);

  const { updateControlSpreadSheet } = useControlSpreadsheet();


  useEffect(() => {
    setControlSpreadSheetForm(controlSpreadSheet);
    console.log(controlSpreadSheet);
  }, [controlSpreadSheet])

  const onSheetChange = (e, amountId) => {
    const { name, value } = e.target;
    setControlSpreadSheetForm({
      ...controlSpreadSheetForm,
      amountPerSizeForProductDTO: controlSpreadSheetForm.amountPerSizeForProductDTO.map(a => {
        if (a.id === amountId) {
          return {
            ...a,
            amountPerSize: {
              ...a.amountPerSize,
              [name]: value
            }
          }
        }
        return a;
      })
    })
  }

  const onChangeDetails = (e) => {
    const { name, value } = e.target;
    setControlSpreadSheetForm({
      ...controlSpreadSheetForm,
      [name]: value
    });
  };

  const onCancelChanges = () => {
    setControlSpreadSheetForm(controlSpreadSheet);
    setEditMode(false);
  };

  const controlSpreadSheetToSendMapper = (updatedControlSpreadSheet) => {
    return {
      id: updatedControlSpreadSheet.id,
      amountPerSizeReceivedForProducts: updatedControlSpreadSheet.amountPerSizeForProductDTO.map(a => {
        return {
          ...a,
          product: {
            id: a.productForLoteDTO.id
          }
        }
      }),
      details: updatedControlSpreadSheet.details
    }
  }

  const onSubmit = () => {
    if (Object.keys(controlSpreadSheetValidator(controlSpreadSheetForm)).length === 0) {
      updateControlSpreadSheet(controlSpreadSheetToSendMapper(controlSpreadSheetForm), setControlSpreadSheet, setEditMode, controlSpreadSheetForm)      
    } else {
      errorAlert({ title: "Error en las cantidades", text: "Las cantidades deben ser mayor o igual a 0" })
    }
  };

  return (
    <>
      <div className="container d-flex row gap-3">
        <div className="d-flex column d-flex justify-content-between">
          {/* <div className="d-flex justify-content-center"> */}
          {/* <h2 className="modal-title" id="staticBackdropLabel"><b>Planilla control</b></h2> */}
          <h2 className="modal-title" id="staticBackdropLabel">Planilla control</h2>

          {/* </div> */}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setControlSpreadSheetIsOpen(false)} ></button>
        </div>
        <hr />
        <div className="container d-flex row gap-3 justify-content-center">

          {
            controlSpreadSheetForm && controlSpreadSheetForm.amountPerSizeForProductDTO &&
            controlSpreadSheetForm.amountPerSizeForProductDTO.map(amount => (
              <AmountPerSizeTable
                key={amount.id}
                amount={amount}
                editMode={editMode}
                onSheetChange={onSheetChange}
              />
            ))
          }

          <hr />
          <h5>Detalles/Observaciones</h5>
          {
            controlSpreadSheetForm && !controlSpreadSheetForm.details && !editMode &&
            <p>Sin detalles</p>
          }
          {
            !editMode ?
              <div className="border">
                <p>
                  {
                    controlSpreadSheetForm && controlSpreadSheetForm.details && controlSpreadSheetForm.details
                  }
                </p>
              </div>
              :
              <textarea name="details" id="" className="form-control" value={controlSpreadSheetForm.details || ""} onChange={onChangeDetails}></textarea>
          }

          <div className="container mt-4 mb-3 d-flex row gap-3">
            {
              !editMode ?
                <button
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Editar planilla
                </button>
                :
                <button
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Guardar Cambios
                </button>
            }

            {
              editMode &&
              <button
                className="btn btn-danger"
                onClick={onCancelChanges}
              > Cancelar cambios
              </button>
            }

          </div>

        </div>

      </div>
    </>
  )
}