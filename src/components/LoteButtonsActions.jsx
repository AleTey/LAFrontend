export const LoteButtonsActions = ({ loteId, loteStatus, onChangeStatus }) => {

  return (
    <>
      {/* <p>sdfdsdfs</p> */}
      {
        loteStatus === "COLA" &&
        <div className="container mt-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "CORTE")}
          >
            Cortar
          </button>
        </div>
      }
      {
        loteStatus === "CORTE" &&
        <div className="container mt-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "PREPARADO")}
          >
            Preparar
          </button>
        </div>
      }

      {
        loteStatus == "PREPARADO" &&
        <div className="container mt-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "TALLER")}
          >
            Enviar a taller
          </button>
        </div>
      }
      {
        loteStatus == "TALLER" &&
        <div className="container mt-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "CONTROL")}
          >
            Finalizar
          </button>
        </div>
      }
      {
        loteStatus == "CONTROL" &&
        <div className="container mt-3">
          <button
            className="btn btn-primary"
            onClick={() => onChangeStatus(loteId, "FINALIZADO")}
          >
            Finalizar
          </button>
        </div>
      }
    </>
  )
}