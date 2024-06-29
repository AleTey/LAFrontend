export const ModelSelectedAtFormCard = ({ model }) => {
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">

          <div className="col-md-8">
            <div className="card-body d-flex flex-col justify-content-between align-items-center">
              <p>Id: {model.id}</p>
              <p>{model.nombre}</p>
              <p>{model.tipoPrenda}</p>
              <p>{model.fechaDeRegistro}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}