export const ProductCardBasicThumbnail = ({ product }) => {

  return (
    <>
      <div className="card" >
        <div className="row g-0">
          <div className="col-md-4" style={{ maxWidth: '4rem' }}>
            <img src={product.img} className="img-thumbnail" style={{ maxWidth: '4rem' }} alt={product.nombre} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex gap-4">
                <div>
                  <p><b>Id:</b> {product.id}</p>
                </div>
                <div>
                  <p><b>Nombre:</b> {product.nombre}</p>
                </div>
                <div>
                  <p><b>Tipo:</b> {product.tipoPrenda}</p>
                </div>
              </div>

              {/* <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}