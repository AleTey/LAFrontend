export const LoteCardQueueBtnActions = ({loteId, onChangeStatus}) => {

  return (
    <>
      <div className="container mt-3">
        <button 
        className="btn btn-primary"
        onClick={()=> onChangeStatus(loteId, "CORTE")}
        >
          Cortar
        </button>
      </div>
    </>
  )
}