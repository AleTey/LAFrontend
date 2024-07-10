import { useContext } from "react";
import { LoteContext } from "../../context/LoteContext";
import { messageInfo } from "../../components/alerts/messageInfo";

export const useLote = () => {

  const {
    lotesQueue,
    dispatchAllQueueLotes,
    dispatchAddQueueLote,
    dispatchRemoveQueueLote,
    lotesCut,
    dispatchAllCutLotes,
    dispatchAddCutLote,
    dispatchRemoveCutLotes,
    lotesPreparation,
    dispatchAllPreparationLotes,
    dispatchRemovePreparationLote,
    lotesWorkshop,
    dispatchAllWorkshopLotes,
    dispatchRemoveWorkshopLote,
    lotesControl,
    dispatchAllControlLotes,
    dispatchRemoveControlLote,
    lotesFinalizado,
    dispatchAllFinalizadoLotes,
    loteDbHasChanged,
    setLoteDbHasChanged,
    newLoteFormIsOpen,
    setNewLoteFormIsOpen
  } = useContext(LoteContext);

  const getLotesByState = async (state) => {
    const lotes = await fetch(`http://localhost:8080/lotes/by-state/${state}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (lotes.ok) {
      const lotesJson = await lotes.json();
      console.log(lotesJson)
      switch (state) {
        case "COLA":
          dispatchAllQueueLotes(loteWithImgMapper(lotesJson));
          break;
        case "CORTE":
          dispatchAllCutLotes(loteWithImgMapper(lotesJson));
          break;
        case "PREPARADO":
          dispatchAllPreparationLotes(loteWithImgMapper(lotesJson));
          break;
        case "TALLER":
          dispatchAllWorkshopLotes(loteWithImgMapper(lotesJson));
          break;
        case "CONTROL":
          dispatchAllControlLotes(loteWithImgMapper(lotesJson));
          break;
        case "FINALIZADO":
          dispatchAllFinalizadoLotes(loteWithImgMapper(lotesJson));
          break;
        default:
          break;
      }
    }
  }



  const addLote = async (lote) => {
    try {

      const res = await fetch('http://localhost:8080/lotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lote)
      })


      if (res.ok) {
        const resJson = await res.json();
        setLoteDbHasChanged("Lote agregado con éxito")
        setTimeout(() => {
          setLoteDbHasChanged("")
        }, 5000)
        setNewLoteFormIsOpen(false);
        dispatchAddQueueLote(oneLoteWithImgMapper(resJson))
      }

    } catch (error) {
      console.log("error: " + error)
    }

  }

  const changeStatus = async (id, status, lote) => {
    console.log(lote)
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

  const findCutSpreadSheetById = async (id, setCutSpreadSheet) => {
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
    }
  }

  const oneLoteWithImgMapper = (lote) => {
    return {
      ...lote,
      productsForLoteDTO: lote.productsForLoteDTO.map(product => ({
        ...product,
        img: `data:image/jpeg;base64,${product.img}`
      }))
    }
  }

  const loteWithImgMapper = (lotes) => {
    return lotes.map(lote => ({
      ...lote,
      productsForLoteDTO: lote.productsForLoteDTO.map(producto => ({
        ...producto,
        img: `data:image/jpeg;base64,${producto.img}`
      }))
    }));
  }

  return {
    lotesQueue,
    lotesPreparation,
    lotesCut,
    lotesWorkshop,
    lotesControl,
    lotesFinalizado,
    getLotesByState,
    addLote,
    changeStatus,
    findCutSpreadSheetById,
    loteDbHasChanged,
    newLoteFormIsOpen,
    setNewLoteFormIsOpen
  }
}