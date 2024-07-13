import { useOrders } from "../hooks/useOrders";

export const OrderCardNoImg = ({ input }) => {

  const { onRemoveFromOrderList } = useOrders();


  return (
    <>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{input.nombre}</h5>
          <b>Codigo: </b> {input.codigo}
          {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          {/* <a href="#" className="card-link">Card link</a> */}
          {/* <a href="#" className="card-link">Another link</a> */}
          <div className="container d-flex justify-content-center mt-3">
            <button onClick={() => onRemoveFromOrderList(input)} type="button" className="btn-close"></button>
          </div>
        </div>
      </div >
    </>
  )
}