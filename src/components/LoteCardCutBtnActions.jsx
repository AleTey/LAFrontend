export const LoteCardCutBtnActions = ({loteId, onChangeStatus}) => {

  return (
    <>
      <div className="container mt-3">
        <button 
        className="btn btn-primary"
        onClick={()=> onChangeStatus(loteId, "PREPARADO")}
        >
          Preparar
        </button>
      </div>
    </>
  )
}