import { useContext, useEffect } from "react"
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { hasAnyRole, hasAnyRoleV2 } from "../auth/utils/hasAnyRole";

export const LoteButtonsActions = ({
  loteId,
  loteStatus,
  onChangeStatus,
  findCutSpreadSheet,
  lote,
  setCutSpreadSheetIsOpen,
  findPreparationSpreadSheet,
  setPreparationSpreadSheetIsOpen,
  setWorkshopSpreadsheetIsOpen,
  findWorkshopSpreadsheet,
  findControlSpreadSheet,
  setControlSpreadSheetIsOpen

}) => {

  const { login } = useContext(AuthContext);

  const CutSheetButton = () => {
    findCutSpreadSheet(lote.cutSpreadsheetForLoteDTO.id)
    setCutSpreadSheetIsOpen(true)
  }

  const preparationSpreadSheetBtn = () => {
    findPreparationSpreadSheet(lote.preparationSpreadSheetForDTO.id);
    setPreparationSpreadSheetIsOpen(true);
  }

  const workshopSpreadSheet = () => {
    findWorkshopSpreadsheet(lote.workShopSpreadSheetForDTO.id);
    setWorkshopSpreadsheetIsOpen(true);
  }

  const controlSpreadSheetBtn = () => {
    findControlSpreadSheet(lote.controlSpreadSheetForDTO.id);
    setControlSpreadSheetIsOpen(true);
  }

  return (
    <>
      {
        loteStatus === "COLA" &&

        <div className="container mt-3 d-flex column gap-3">
          {
            hasAnyRole(login.user.authorities, ["UPDATE_CUT_SPREADSHEET"]) &&
            <button
              className="btn btn-primary"
              onClick={() => onChangeStatus(loteId, "CORTE")}
            >
              Cortar
            </button>
          }
        </div>
      }
      {
        loteStatus === "CORTE" &&
        <div className="container mt-3 d-flex column gap-3">
          {
            hasAnyRole(login.user.authorities, ["UPDATE_CUT_SPREADSHEET"]) &&
            <button
              className="btn btn-primary"
              onClick={() => onChangeStatus(loteId, "PREPARADO")}
            >
              Preparar
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_CUT_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={CutSheetButton}
            >
              Planilla corte
            </button>
          }
        </div>
      }

      {
        loteStatus == "PREPARADO" &&
        <div className="container mt-3 d-flex column gap-3">
          {
            hasAnyRole(login.user.authorities, ["UPDATE_PREPARATION_SPREADSHEET"]) &&
            <button
              className="btn btn-primary"
              onClick={() => onChangeStatus(loteId, "TALLER")}
            >
              Enviar a taller
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_PREPARATION_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={CutSheetButton}
            >
              Planilla corte
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_PREPARATION_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={preparationSpreadSheetBtn}
            >
              Planilla preparado
            </button>
          }


        </div>
      }
      {
        loteStatus == "TALLER" &&
        <div className="container mt-3 d-flex column gap-3">
          {
            hasAnyRole(login.user.authorities, ["UPDATE_WORKSHOP_SPREADSHEET"]) &&
            <button
              className="btn btn-primary"
              onClick={() => onChangeStatus(loteId, "CONTROL")}
            >
              Finalizar
            </button>
          }

          {
            hasAnyRoleV2(["READ_CUT_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={CutSheetButton}
            >
              Planilla corte
            </button>
          }
          {
            hasAnyRoleV2(["READ_PREPARATION_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={preparationSpreadSheetBtn}
            >
              Planilla preparado
            </button>
          }
          {
            hasAnyRoleV2(["READ_WORKSHOP_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={workshopSpreadSheet}
            >
              Planilla taller
            </button>
          }
        </div>
      }
      {

        loteStatus == "CONTROL" &&
        <div className="container mt-3 d-flex column gap-3">
          {
            hasAnyRole(login.user.authorities, ["UPDATE_CONTROL_SPREADSHEET"]) &&
            <button
              className="btn btn-primary"
              onClick={() => onChangeStatus(loteId, "FINALIZADO")}
            >
              Finalizar
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_CUT_SPREADSHEET"]) &&

            <button
              className="btn btn-secondary"
              onClick={CutSheetButton}
            >
              Planilla corte
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_PREPARATION_SPREADSHEET"]) &&

            <button
              className="btn btn-secondary"
              onClick={preparationSpreadSheetBtn}
            >
              Planilla preparado
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_WORKSHOP_SPREADSHEET"]) &&

            <button
              className="btn btn-secondary"
              onClick={workshopSpreadSheet}
            >
              Planilla taller
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_CONTROL_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={controlSpreadSheetBtn}
            >
              Planilla control
            </button>
          }
        </div>
      }

      {
        loteStatus == "FINALIZADO" &&
        <div className="container mt-3 d-flex column gap-3">
          {
            hasAnyRole(login.user.authorities, ["READ_PREPARATION_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={CutSheetButton}
            >
              Planilla corte
            </button>

          }
          {
            hasAnyRole(login.user.authorities, ["READ_PREPARATION_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={preparationSpreadSheetBtn}
            >
              Planilla preparado
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_WORKSHOP_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={workshopSpreadSheet}
            >
              Planilla taller
            </button>
          }
          {
            hasAnyRole(login.user.authorities, ["READ_CONTROL_SPREADSHEET"]) &&
            <button
              className="btn btn-secondary"
              onClick={controlSpreadSheetBtn}
            >
              Planilla control
            </button>
          }
        </div>
      }
    </>
  )
}