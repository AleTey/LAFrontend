import { useContext } from "react"
import { LoteCardQueueBtnActions } from "./LoteCardQueueBtnActions"
import { ProductCardBasicThumbnail } from "./ProductCardBasicThumbnail"
import { LoteContext } from "../context/LoteContext"
import { messageInfo } from "./alerts/messageInfo"
import { LoteCardCutBtnActions } from "./LoteCardCutBtnActions"
import { LoteButtonsActions } from "./LoteButtonsActions"

export const LoteCard = ({ lote }) => {

  const { dispatchRemoveQueueLote,
    dispatchRemoveCutLotes,
    dispatchRemovePreparationLote,
    dispatchRemoveWorkshopLote,
    dispatchRemoveControlLote,
    dispatchRemoveFinalizadoLote
  } = useContext(LoteContext);

  const onChangeStatus = (id, status) => {
    const changeStatus = async (id, status) => {
      try {

        const changeState = await fetch(`http://localhost:8080/lotes/update-state/${id}/${status}`, {
          method: 'PUT'
        })
        if (changeState.ok) {

          switch (status) {
            case "CORTE":
              dispatchRemoveQueueLote(id);
              break;

            case "PREPARADO":
              dispatchRemoveCutLotes(id)
              break;

            case "TALLER":
              dispatchRemovePreparationLote(id);
              break;

            case "CONTROL":
              dispatchRemoveWorkshopLote(id);
              break;
            case "FINALIZADO":
              dispatchRemoveControlLote(id);
              break;

            default:
              break;
          }
        } else {
          const error = new Error("Error en la solicitud");
          error.response = changeState;
          throw error;
        }

      } catch (error) {
        if (error.response && error.response.status === 409) {
          messageInfo({ message: 'Solo puedo haber un lote en estado de corte' })
        }
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
            <div>
              <p><b>Taller: </b>{lote.workShopDto.name}</p>
              <p><b>Estado: </b>{lote.status}</p>
              <p><b>Detalles: </b>{lote.additionalDetails}</p>
            </div>
          }
          <p><b>Productos:</b></p>
          {
            lote.productsForLoteDTO && lote.productsForLoteDTO.map(product => (
              <ProductCardBasicThumbnail
                key={product.id}
                product={product}
              />
              // </div>
            ))
          }
          <LoteButtonsActions
            key={lote.id}
            loteId={lote.id}
            loteStatus={lote.status}
            onChangeStatus={onChangeStatus}
          />

        </div>
        <div className="card-footer text-body-secondary">
          fecha de creación: {lote.creationDate}
        </div>
      </div>
    </>
  )
}