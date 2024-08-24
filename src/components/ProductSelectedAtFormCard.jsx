export const ProductSelectedAtFormCard = ({ product }) => {

  return (
    <>
<div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <img src={product.urlFile} className="img-fluid rounded-start img-thumbnail" alt={`tela ${product.nombre}`} style={{ maxWidth: '4rem' }} />
          <div className="col-md-8">
            <div className="card-body d-flex flex-col justify-content-between align-items-center">
              <p>Id: {product.id}</p>
              <p>{product.nombre}</p>
              <p>Modelo: {product.model}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}