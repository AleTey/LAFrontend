import { useContext } from "react";
import { LoteContext } from "../../context/LoteContext";
import { messageInfo } from "../../components/alerts/messageInfo";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";
import { hasAnyRole, hasAnyRoleV2 } from "../../auth/utils/hasAnyRole";

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
    dispatchRemoveFinalizado,
    loteDbHasChanged,
    setLoteDbHasChanged,
    newLoteFormIsOpen,
    setNewLoteFormIsOpen
  } = useContext(LoteContext);

  const { login, handlerLogout } = useContext(AuthContext);

  const getLotesByState = async (state) => {
    const lotes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/by-state/${state}`, {
      method: 'GET',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
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
    } else {
      const error = await lotes.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }

  }

  const addLote = async (lote) => {
    try {

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes`, {
        method: 'POST',
        headers: {
          'Authorization': sessionStorage.getItem('token'),
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
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }

    } catch (error) {
      console.log("error: " + error)
    }

  }

  // const changeStatus = (id, status) =>{

  // }

  const dispatcher = (id, status, direction) => {
    // const direction = d;
    try {
      console.log("DIRECTION DISPATCHER")
      console.log(direction)
      switch (status) {
        case "COLA":
          dispatchRemoveCutLotes(id);
          break;

        case "CORTE":
          if (direction = "next") {
            dispatchRemoveQueueLote(id);
          }
          else {
            dispatchRemovePreparationLote(id);
          }
          break;

        case "PREPARADO":
          if (direction = "next") {
            dispatchRemoveCutLotes(id)
          } else {
            dispatchRemoveWorkshopLote(id);
          }
          break;

        case "TALLER":
          if (direction = "next") {
            dispatchRemovePreparationLote(id);
          } else {
            dispatchRemoveControlLote(id);
          }
          break;

        case "CONTROL":
          if (direction = "next") {
            dispatchRemoveWorkshopLote(id);
          } else {
            dispatchRemoveFinalizado(id);
          }
          break;
        case "FINALIZADO":
          dispatchRemoveControlLote(id);
          break;

        default:
          break;
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        messageInfo({ message: 'Solo puedo haber un lote en estado de corte' })
      }
    }
  }
  const dispatcherRemove = (id, status) => {
    try {

      switch (status) {

        case "CORTE":
          dispatchRemoveCutLotes(id)
          break;

        case "PREPARADO":
          dispatchRemovePreparationLote(id);
          break;

        case "TALLER":
          dispatchRemoveWorkshopLote(id);
          break;

        case "CONTROL":
          dispatchRemoveControlLote(id);
          break;
        case "FINALIZADO":
          dispatchRemoveFinalizado(id);
          break;

        default:
          break;
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        messageInfo({ message: 'Solo puedo haber un lote en estado de corte' })
      }
    }
  }

  const changeStatus = (id, status) => {
    if (hasAnyRole(login.user.authorities, ["ROLE_WORKSHOP"])) {
      changeStateWorkshop(id, status);
    }
    if (hasAnyRole(login.user.authorities, ["ROLE_ADMIN"])) {
      changeStateAdmin(id, status);
    }
    if (hasAnyRole(login.user.authorities, ["ROLE_CONTROLLER"])) {
      changeStateController(id, status);
    }

    if (hasAnyRole(login.user.authorities, ["ROLE_CUTTER"])) {
      changeStateCutter(id, status);
    }

  }

  const changeStateAdmin = async (id, status, direction = "") => {
    console.log("FETCH")
    console.log(direction)
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/update-state/${id}/${status}`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    })
    if (res.ok) {
      if (direction === "prev") {
        dispatcherRemove(id, nextState(status));
      }
      dispatcher(id, status);
    } else {
      try {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      } catch (error) {

      }
      return false;
    }
  }
  const changeStateCutter = async (id, status) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/update-state-cutter/${id}/${status}`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    })
    if (res.ok) {
      dispatcher(id, status);
    } else {
      try {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      } catch (error) {

      }
      return false;
    }
  }

  const changeStateWorkshop = async (id, status) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/update-state-workshop/${id}/${status}`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    });
    if (res.ok) {
      dispatcher(id, status);
    } else {
      try {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      } catch (error) {

      }

      return false;
    }
  }

  const changeStateController = async (id, status) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/update-state-controller/${id}/${status}`, {
      method: "PUT",
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
    if (res.ok) {
      dispatcher(id, status);
    } else {
      try {
        const error = await res.json();
        if (error && error.message && error.message === "Please Login") {
          handlerLogout();
        }
      } catch (error) {

      }

      return false;
    }
  }

  const getLotesForWorkshop = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/lotes-workshop`, {
      headers: {
        'Authorization': sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const resJson = await res.json();
      dispatchAllWorkshopLotes(loteWithImgMapper(resJson));

    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
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

  const previousState = (currentState) => {
    console.log("previousStatus")
    const status = ["COLA", "CORTE", "PREPARADO", "TALLER", "CONTROL", "FINALIZADO"];
    const currentIndex = status.indexOf(currentState);
    if (currentIndex <= 0) {
      return null;
    }
    console.log(status[currentIndex - 1]);
    return status[currentIndex - 1];
  }
  const nextState = (currentState) => {
    console.log("previousStatus")
    const status = ["COLA", "CORTE", "PREPARADO", "TALLER", "CONTROL", "FINALIZADO"];
    const currentIndex = status.indexOf(currentState);
    if (currentIndex >= status.length) {
      return null;
    }
    console.log(status[currentIndex - 1]);
    return status[currentIndex + 1];
  }

  return {
    lotesQueue,
    lotesPreparation,
    lotesCut,
    lotesWorkshop,
    lotesControl,
    lotesFinalizado,
    getLotesByState,
    getLotesForWorkshop,
    addLote,
    changeStatus,
    // findCutSpreadSheetById,
    loteDbHasChanged,
    newLoteFormIsOpen,
    setNewLoteFormIsOpen,
    loteWithImgMapper,
    previousState,
    changeStateAdmin
  }
}