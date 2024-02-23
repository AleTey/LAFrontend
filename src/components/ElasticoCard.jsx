export const ElasticoCard = ({ elastico }) => {

  return (
    <>
      <div className="card d-flex mx-2 my-2" style={{ width: " 22rem" }} >
        <div className="card-body">
          <h4 className="card-title">{elastico.nombre}</h4>
          {/* <h6 className="card-subtitle mb-2 text-body-secondary"><b>Card subtitle</b></h6> */}
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Id:</b> {elastico.id}</li>
            <li className="list-group-item"><b>Proveedor:</b> {elastico.proveedor.empresa}</li>
            <li className="list-group-item"><b>Detalle:</b> {elastico.detalle}</li>
            <li className="list-group-item"><b>Ancho:</b> {elastico.ancho}</li>
            <li className="list-group-item"><b>Material:</b> {elastico.material}</li>
            <li className="list-group-item"><b>Color:</b> {elastico.color}</li>
            <li className="list-group-item"><b>Precio Rollo:</b> {elastico.precioRollo}</li>
            <li className="list-group-item"><b>Precio Metro:</b> {elastico.precioMtr}</li>
            <li className="list-group-item"><b>Stock Rollos:</b> {elastico.stockEnRollos}</li>
          </ul>
          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a> */}
        </div>
      </div>
    </>
  )
}