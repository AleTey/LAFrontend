import { useContext, useEffect, useState } from "react"
import { AmountPerSizeTable } from "./AmountPerSizeTable";
import { useWorkshopSpreadsheet } from "../hooks/lotes/useWorkshopSpreadsheet";
import { hasAnyRole } from "../auth/utils/hasAnyRole";
import { AuthContext } from "../auth/context/AuthContext";

export const WorkshopSpreadSheep = ({ workshopSpreadSheet, setWorkshopSpreadSheet, setWorkshopSpreadSheetIsOpen }) => {

  const [workshopSpreedSheetForm, setWorkshopSpreadSheetForm] = useState({});

  const [editMode, setEditMode] = useState(false);

  const { updateWorkshopSpreadSheet } = useWorkshopSpreadsheet();

  const {login} = useContext(AuthContext);

  useEffect(() => {
    setWorkshopSpreadSheetForm(workshopSpreadSheet)
  }, [workshopSpreadSheet])

  const onSheetChangeAmount = (e, amountId) => {
    const { name, value } = e.target;
    setWorkshopSpreadSheetForm({
      ...workshopSpreedSheetForm,
      amountPerSizeForProducts: workshopSpreedSheetForm.amountPerSizeForProducts.map(a => {
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
  const onSheetChangeDefectiveAmount = (e, amountId) => {
    const { name, value } = e.target;
    setWorkshopSpreadSheetForm({
      ...workshopSpreedSheetForm,
      amountPerSizeDefectiveForProducts: workshopSpreedSheetForm.amountPerSizeDefectiveForProducts.map(a => {
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
    console.log("name: " + name)
    console.log("value: " + value)
    setWorkshopSpreadSheetForm({      
      ...workshopSpreedSheetForm,
      [name]: value
    })
    console.log(workshopSpreedSheetForm)
  }

  const onCancelChanges = () => {
    setWorkshopSpreadSheetForm(workshopSpreadSheet);
    setEditMode(false);
  }

  const workshopSpreadSheetToSendMapper = (newWorkshopSpreadSheet) => {
    return {
      id: newWorkshopSpreadSheet.id,
      amountPerSizeForProducts: newWorkshopSpreadSheet.amountPerSizeForProducts.map(amount => {
        return {
          ...amount,
          product: {
            id: amount.productForLoteDTO.id
          }
        }
      }),
      amountPerSizeDefectiveForProducts: newWorkshopSpreadSheet.amountPerSizeDefectiveForProducts.map(amount => {
        return {
          ...amount,
          product: {
            id: amount.productForLoteDTO.id
          }
        }
      }),
      details: workshopSpreedSheetForm.details
    }
  }


  const onSubmit = () => {
    updateWorkshopSpreadSheet(workshopSpreadSheetToSendMapper(workshopSpreedSheetForm), setWorkshopSpreadSheet, workshopSpreedSheetForm, setEditMode);
  }

  return (
    <>
      <div className="container d-flex row gap-3">
        <div className="d-flex column d-flex justify-content-between">
          {/* <div className="d-flex justify-content-center"> */}
          {/* <h2 className="modal-title" id="staticBackdropLabel"><b>Planilla taller</b></h2> */}
          <h2 className="modal-title" id="staticBackdropLabel">Planilla taller</h2>

          {/* </div> */}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setWorkshopSpreadSheetIsOpen(false)} ></button>
        </div>
        <hr />
        <div className="container d-flex row gap-3 justify-content-center">

          <h5>Cantidades:</h5>

          {
            workshopSpreedSheetForm && workshopSpreedSheetForm.amountPerSizeForProducts &&
            workshopSpreedSheetForm.amountPerSizeForProducts.map(amount => (
              <AmountPerSizeTable
                key={amount.id}
                amount={amount}
                editMode={editMode}
                onSheetChange={onSheetChangeAmount}
              />
            ))
          }

          <hr />

          <h5>Fallas:</h5>

          {
            workshopSpreedSheetForm && workshopSpreedSheetForm.amountPerSizeDefectiveForProducts &&
            workshopSpreedSheetForm.amountPerSizeDefectiveForProducts.map(amountDefective => (

              <AmountPerSizeTable
                key={amountDefective.id}
                amount={amountDefective}
                editMode={editMode}
                onSheetChange={onSheetChangeDefectiveAmount}
                color="danger"
              />
            ))
          }

          <hr />
          <h5>Detalles/Observaciones</h5>
          {
            workshopSpreedSheetForm && !workshopSpreedSheetForm.details && !editMode &&
            <p>Sin detalles</p>
          }
          {
            !editMode ?
              <div className="border">
                <p>{workshopSpreedSheetForm.details}</p>
              </div>
              :
              <textarea name="details" id="" className="form-control" value={workshopSpreedSheetForm.details || ""} onChange={onChangeDetails}></textarea>
          }

          <hr />
          {
            hasAnyRole(login.user.authorities, ["UPDATE_WORKSHOP_SPREADSHEET"]) &&
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
          }
        </div>
      </div>
    </>
  )
}