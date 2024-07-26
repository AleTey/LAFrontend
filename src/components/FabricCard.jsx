import { useContext, useState } from "react";
import { AddFabricStockModal } from "./AddFabricStockModal"
import { NewFabricModal } from "./NewFabricModal";
import { OrderContext } from "../context/OrdersContext";
import { useOrders } from "../hooks/useOrders";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { hasAnyRole } from "../auth/utils/hasAnyRole";

export const FabricCard = ({
  fabric,
  editFabric,
  onDeleteFabric
}) => {

  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  const { login } = useContext(AuthContext);

  // const {
  //   orderList,
  //   setOrderList
  // } = useContext(OrderContext);

  const { orderList,
    setOrderList,
    onAddOrderList } = useOrders();

  const agregarMetros = () => {
    <AddFabricStockModal />
  }

  const onEditButton = () => {
    setEditFormIsOpen(true)
  }

  // const onAddOrderList = (fabric) => {
  //   setOrderList([
  //     ...orderList,
  //     fabric
  //   ])
  // }

  return (
    <>
      {
        editFormIsOpen && <NewFabricModal fabric={fabric} setEditFormIsOpen={setEditFormIsOpen} editFabric={editFabric} />
      }
      <div className="card g-0 mx-2 my-2" style={{ width: " 18rem" }}>
        {/* <img src={img} className="card-img-top" alt="..." /> */}
        {fabric.img ?
          <img src={fabric.img} className="card-img-top" alt="..." />
          :
          <img src="src/db/imgs/image-not-found.jpg" className="card-img-top" alt={fabric.color} />
        }
        <div className="card-body">
          <h5 className="card-title">{fabric.nombre}</h5>
          <p className="card-text">
            {/* Some quick example text to build on the card title and make up the bulk of the card's content. */}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Color: {fabric.color}</li>
          <li className="list-group-item">Codigo de Fabrica: {fabric.codigo}</li>
          <li className="list-group-item">Id: {fabric.id}</li>
          <li className="list-group-item">Proveedor : {fabric.proveedor.empresa}</li>
          <li className="list-group-item">Tipo: {fabric.tipo}</li>
          <li className="list-group-item">Stock: {fabric.stock} M
            <button className="btn btn-outline-success btn-sm ms-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar</button>
          </li>
          <li className="list-group-item">Temporada: {fabric.temporada}</li>
          <li className="list-group-item">Tags: {fabric.tags}</li>
          <li className="list-group-item">Precio: : {fabric.precio}</li>
        </ul>
        <div className="card-body grid">

          {
            hasAnyRole(login.user.authorities, ["ROLE_MANAGER", "ROLE_ADMIN"]) &&
            <abbr title="Agregar a pedidos" className="initialism">
              <button
                className="btn btn-success mx-1"
                onClick={() => onAddOrderList(fabric)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
            </abbr>
          }



          {
            hasAnyRole(login.user.authorities, ["UPDATE_FABRIC"]) &&
            <abbr title="Editar" className="initialism">
              <button className="btn btn-secondary mx-1" onClick={onEditButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </button>
            </abbr>
          }

          {
            hasAnyRole(login.user.authorities, ["DELETE_FABRIC"]) &&
            <abbr title="Eliminar insumo" className="initialism">
              <button className="btn btn-danger mx-1" onClick={() => onDeleteFabric(fabric.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon" viewBox="0 0 16 16">
                  <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </abbr>
          }



          {/* <abbr title="Mas info" className="initialism">
            <button className="btn btn-info mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </button>
          </abbr> */}
          {/* </div> */}

          {/* <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar stock en mts de {fabric.color}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}