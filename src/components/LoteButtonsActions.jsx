import { useEffect } from "react"

export const LoteButtonsActions = ({ loteId, loteStatus, onChangeStatus, findCutSpreadSheet, lote, setCutSpreadSheetIsOpen }) => {

  useEffect(()=>{
    console.log(lote)
  },[])

  const CutSheetButton = () => {
    findCutSpreadSheet(lote.cutSpreadsheetForLoteDTO.id)
    setCutSpreadSheetIsOpen(true)
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
          >
            Planilla corte
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
          >
            Planilla corte
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
          >
            Planilla corte
          </button>
        </div>
      }
    </>
  )
}