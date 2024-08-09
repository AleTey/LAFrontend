import '../acss/newCollection.css'
export const ModelSimplestCard = ({ model, closeable, onClose }) => {

  return (
    <>
      <div className="card hiddenOverflow" >
        <div className="card-body hiddenOverflow">
          {
            closeable &&
            <button className='btn-close' onClick={e => { onClose(model.id) }}>
            </button>
          }
          <h5 className="card-title">{model.nombre}</h5>
          {/* </div> */}
          <h6 className="card-subtitle mb-2 text-body-secondary">{model.tipoPrenda}</h6>
          <p className="card-text">Id: {model.id}</p>
        </div>
      </div>
    </>
  )
}