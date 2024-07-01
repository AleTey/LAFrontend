import { LoteCardQueueBtnActions } from "./LoteCardQueueBtnActions"
import { ProductCardBasicThumbnail } from "./ProductCardBasicThumbnail"

export const LoteCard = ({ lote }) => {

  const onChangeStatus = (id, status) => {
    const changeStatus = async (id, status) => {
      const changeState = await fetch(`http://localhost:8080/lotes/update-state/${id}/${status}`, {
        method: 'PUT'
      })
      if (changeState.ok) {

      }
    }
    changeStatus(id, status);
  }

  return (
    <>

      <div className="card mb-3">
        <div className="card-header">
          <h4 className="text-primary-emphasis"><b>Lote: {lote.id}</b></h4>
        </div>
        <div className="card-body">

          {
            lote.status === "COLA" &&
            <div>
              <p><b>Taller: </b>{lote.workShopDto.name}</p>
              <p><b>Estado: </b>{lote.status}</p>
              <p><b>Detalles: </b>{lote.additionalDetails}</p>
            </div>
          }

          {/* <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div> */}
          <p><b>Productos:</b></p>
          {
            lote.productsForLoteDTO && lote.productsForLoteDTO.map(product => (
              // <div key={product.id} className="gap-1">
              <ProductCardBasicThumbnail
                key={product.id}
                product={product}
              />
              // </div>
            ))
          }
          <LoteCardQueueBtnActions
            key={lote.id}
            loteId={lote.id}
            onChangeStatus={onChangeStatus}
          />
        </div>
        <div className="card-footer text-body-secondary">
          fecha de creación: {lote.creationDate}
        </div>
      </div>





      {/* <div className="container d-flex">
        <div className="d-flex">
          Lote: {lote.id}
          {
            lote.productsForLoteDTO && lote.productsForLoteDTO.map(product => (
              <div key={product.id}>
                <p>Products: {product.nombre}</p>
              </div>
            ))
          }
        </div>
        <div className="d-flex">

        </div>
      </div> */}
    </>
  )
}