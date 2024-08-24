export const ProductSimpleCard = ({ product }) => {



  return (
    <>

      <div className="card" style={{ width: "10rem" }}>
        <a href={product.urlFile} target="_blank">
          <img src={product.urlFile} className="card-img-top" alt="..." style={{ maxHeight: "8rem", objectFit: "cover" }} />
        </a>
        <div className="card-body">
          <b><p className="card-text">{product.nombre}</p></b>
          <p className="card-text">{product.model}</p>
          <p className="card-text">{product.tipoPrenda}</p>
        </div>
      </div>

    </>
  )
}