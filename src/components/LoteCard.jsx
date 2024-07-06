import { useContext, useEffect, useState } from "react"
import { LoteCardQueueBtnActions } from "./LoteCardQueueBtnActions"
import { ProductCardBasicThumbnail } from "./ProductCardBasicThumbnail"
import { LoteContext } from "../context/LoteContext"
import { messageInfo } from "./alerts/messageInfo"
import { LoteCardCutBtnActions } from "./LoteCardCutBtnActions"
import { LoteButtonsActions } from "./LoteButtonsActions"
import { CutSpreadSheet } from "./CutSpreadSheet"

export const LoteCard = ({ lote }) => {

  const [cutSpreadSheetIsOpen, setCutSpreadSheetIsOpen] = useState(false);

  const [cutSpreadSheet, setCutSpreadSheet] = useState({});

  const { dispatchRemoveQueueLote,
    dispatchRemoveCutLotes,
    dispatchRemovePreparationLote,
    dispatchRemoveWorkshopLote,
    dispatchRemoveControlLote,
    dispatchRemoveFinalizadoLote
  } = useContext(LoteContext);

  // useEffect(() => { console.log(lote) }, [])

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

  const findCutSpreadSheet = (id) => {
    console.log(lote)
    const findCutSpreadSheetById = async (id) => {
      console.log(lote)
      const res = await fetch(`http://localhost:8080/cut-spreadsheets/${id}`);

      if (res.ok) {
        const cutSpreadSheetJson = await res.json();
        console.log(cutSpreadSheetJson)

        setCutSpreadSheet({
          ...cutSpreadSheetJson,
          amountPerSizeForProductDTO:
            cutSpreadSheetJson.amountPerSizeForProductDTO
              .map(d => {
                const imgUrl = `data:image/jpeg;base64,${d.productForLoteDTO.img}`;
                if (d.productForLoteDTO.img) {
                  return {
                    ...d,
                    productForLoteDTO: {
                      ...d.productForLoteDTO,
                      img: imgUrl
                    }
                  };
                };
                return {
                  ...d,
                  productForLoteDTO: {
                    ...d.productForLoteDTO,
                    img: null
                  }
                };
              }),


          fabricLengthDetailsDTOs:
            cutSpreadSheetJson.fabricLengthDetailsDTOs.map(fDetail => {
              if (fDetail.fabricNombreCodigoTipoImgDTO.img) {
                const imgUrl = `data:image/jpeg;base64,${fDetail.fabricNombreCodigoTipoImgDTO.img}`
                return {
                  ...fDetail,
                  fabricNombreCodigoTipoImgDTO: {
                    ...fDetail.fabricNombreCodigoTipoImgDTO,
                    img: imgUrl
                  }
                }
              }
              return {
                ...fDetail,
                fabricNombreCodigoTipoImgDTO: {
                  ...fDetail.fabricNombreCodigoTipoImgDTO,
                  img: null
                }
              }
            })

        })



        // setCutSpreadSheet({
        //   ...cutSpreadSheet,
        //   fabricLengthDetailsDTOs:
        //     cutSpreadSheet.fabricLengthDetailsDTOs.map(fDetail => {
        //       if (fDetail.fabricNombreCodigoTipoImgDTO.img) {
        //         const imgUrl = `data:image/jpeg;bases6,${fDetail.fabricNombreCodigoTipoImgDTO.img}`
        //         return {
        //           ...fDetail,
        //           fabricNombreCodigoTipoImgDTO: {
        //             ...fDetail.fabricNombreCodigoTipoImgDTO,
        //             img: imgUrl
        //           }
        //         }
        //       }
        //       return {
        //         ...fDetail,
        //         fabricNombreCodigoTipoImgDTO: {
        //           ...fDetail.fabricNombreCodigoTipoImgDTO,
        //           img: null
        //         }
        //       }
        //     })
        // })
      }
    }
    findCutSpreadSheetById(id);
  }

  return (
    <>

      <div className="card mb-3 border-primary">
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
            findCutSpreadSheet={findCutSpreadSheet}
            lote={lote}
            setCutSpreadSheetIsOpen={setCutSpreadSheetIsOpen}
          />

        </div>
        <div className="card-footer text-body-secondary">
          fecha de creación: {lote.creationDate}
        </div>
        {
          cutSpreadSheetIsOpen &&
          <div className="card-footer text-body-secondary">
            <CutSpreadSheet
              cutSpreadSheet={cutSpreadSheet}
              setCutSpreadSheetIsOpen={setCutSpreadSheetIsOpen}
            />
          </div>
        }
      </div>
    </>
  )
}