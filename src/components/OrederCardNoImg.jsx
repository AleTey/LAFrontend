import { useOrders } from "../hooks/useOrders";

export const OrderCardNoImg = ({ input }) => {

  const { onRemoveFromOrderList } = useOrders();


  return (
    <>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{input.nombre}</h5>
          <b>Codigo: </b> {input.codigo}
          <div className="container d-flex justify-content-center mt-3">
            <button
              onClick={() => onRemoveFromOrderList(input)}
              type="button"
              className="btn-close"
            ></button>
          </div>
        </div>
      </div >
    </>
  )
}