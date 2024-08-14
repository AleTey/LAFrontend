export const FabricSelectedAtFormCard = ({ fabric }) => {
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          {
            fabric.urlFile ?
              <a href={fabric.urlFile} target="_blank">
                <th><img src={fabric.urlFile} className="img-fluid rounded-start img-thumbnail" alt={`tela ${fabric.nombre}`} style={{ maxWidth: '4rem' }} /></th>
              </a>
              :
              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '4rem' }}className="img-fluid img-fluid" /></th>
          }

          {/* <img src={fabric.urlFile} className="img-fluid rounded-start img-thumbnail" alt={`tela ${fabric.nombre}`} style={{ maxWidth: '4rem' }} /> */}
          <div className="col-md-8">
            <div className="card-body d-flex flex-col justify-content-between align-items-center">
              <p>Id: {fabric.id}</p>
              <p>{fabric.nombre}</p>
              <p>Color{fabric.color}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}