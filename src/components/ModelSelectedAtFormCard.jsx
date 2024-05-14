export const ModelSelectedAtFormCard = ({ model }) => {
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          {/* <div className="col-md-4"> */}
          {/* <img src={model.img} className="img-fluid rounded-start img-thumbnail" alt={`tela ${model.nombre}`} style={{ maxWidth: '4rem' }} /> */}
          {/* </div> */}
          <div className="col-md-8">
            <div className="card-body d-flex flex-col justify-content-between align-items-center">
              {/* <h5 className="card-title">{fabric.nombre}</h5> */}
              <p>Id: {model.id}</p>
              <p>{model.nombre}</p>
              <p>{model.tipoPrenda}</p>
              <p>{model.fechaDeRegistro}</p>
              {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}