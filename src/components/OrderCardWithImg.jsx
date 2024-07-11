import { useOrders } from "../hooks/useOrders"

export const OrderCardWithImg = ({ input }) => {

  const { onRemoveFromOrderList } = useOrders();

  return (
    <>
      <div className="card" style={{ width: "9rem" }}>
        <img src={input.img} className="card-img-top" alt={input.nombre} />
        <div className="card-body">
          <h5 className="card-title">{input.nombre}</h5>
          <b>Codigo: </b> {input.codigo}
          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
          <div className="container d-flex justify-content-center mt-3">
            <button onClick={() => onRemoveFromOrderList(input)} type="button" className="btn-close"></button>
          </div>

        </div>
      </div>

    </>
  )
}