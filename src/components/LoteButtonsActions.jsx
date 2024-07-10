import { useEffect } from "react"

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

  // useEffect(() => {
  //   console.log(lote)
  // }, [])

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
      {/* <p>sdfdsdfs</p> */}
      {
        loteStatus === "COLA" &&
        <div className="container mt-3 d-flex column gap-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "CORTE", lote)}
          >
            Cortar
          </button>
        </div>
      }
      {
        loteStatus === "CORTE" &&
        <div className="container mt-3 d-flex column gap-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "PREPARADO")}
          >
            Preparar
          </button>

          <button
            className="btn btn-secondary"
            onClick={CutSheetButton}
          >
            Planilla corte
          </button>
        </div>
      }

      {
        loteStatus == "PREPARADO" &&
        <div className="container mt-3 d-flex column gap-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "TALLER")}
          >
            Enviar a taller
          </button>

          <button
            className="btn btn-secondary"
            onClick={CutSheetButton}
          >
            Planilla corte
          </button>

          <button
            className="btn btn-secondary"
            onClick={preparationSpreadSheetBtn}
          >
            Planilla preparado
          </button>


        </div>
      }
      {
        loteStatus == "TALLER" &&
        <div className="container mt-3 d-flex column gap-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "CONTROL")}
          >
            Finalizar
          </button>

          <button
            className="btn btn-secondary"
            onClick={CutSheetButton}
          >
            Planilla corte
          </button>

          <button
            className="btn btn-secondary"
            onClick={preparationSpreadSheetBtn}
          >
            Planilla preparado
          </button>

          <button
            className="btn btn-secondary"
            onClick={workshopSpreadSheet}
          >
            Planilla taller
          </button>
        </div>
      }
      {
        loteStatus == "CONTROL" &&
        <div className="container mt-3 d-flex column gap-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "FINALIZADO")}
          >
            Finalizar
          </button>

          <button
            className="btn btn-secondary"
            onClick={CutSheetButton}
          >
            Planilla corte
          </button>

          <button
            className="btn btn-secondary"
            onClick={preparationSpreadSheetBtn}
          >
            Planilla preparado
          </button>

          <button
            className="btn btn-secondary"
            onClick={workshopSpreadSheet}
          >
            Planilla taller
          </button>

          <button
            className="btn btn-secondary"
            onClick={controlSpreadSheetBtn}
          >
            Planilla control
          </button>
        </div>
      }

      {
        loteStatus == "FINALIZADO" &&
        <div className="container mt-3 d-flex column gap-3">

          <button
            className="btn btn-secondary"
            onClick={CutSheetButton}
          >
            Planilla corte
          </button>

          <button
            className="btn btn-secondary"
            onClick={preparationSpreadSheetBtn}
          >
            Planilla preparado
          </button>

          <button
            className="btn btn-secondary"
            onClick={workshopSpreadSheet}
          >
            Planilla taller
          </button>

          <button
            className="btn btn-secondary"
            onClick={controlSpreadSheetBtn}
          >
            Planilla control
          </button>
        </div>
      }
    </>
  )
}