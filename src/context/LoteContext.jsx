import { createContext, useReducer, useState } from "react";
import { loteReducer } from "../reducers/loteReducer";
import { loteQueueReducer } from "../reducers/loteQueueReducer";
import { lotePreparationReducer } from "../reducers/lotePreparationReducer";
import { loteCutReducer } from "../reducers/loteCutReducer";
import { loteWorkshopReducer } from "../reducers/loteWorkshopReducer";
import { loteControlReducer } from "../reducers/loteControlReducer";
import { loteFinalizadoReducer } from "../reducers/loteFinalizadoReducer";

export const LoteContext = createContext();

export const LoteProvider = ({ children }) => {
  const [statusHasChanged, setStatusHasChanged] = useState(false);
  const [loteDbHasChanged, setLoteDbHasChanged] = useState("");
  const [newLoteFormIsOpen, setNewLoteFormIsOpen] = useState(false);
  const [lotes, dispatchLotes] = useReducer(loteReducer, []);

  const [lotesQueue, dispatchLotesQueue] = useReducer(loteQueueReducer, []);
  const dispatchAllQueueLotes = (lotesQueue) => dispatchLotesQueue({ type: "GET_ALL_QUEUE_LOTES", payload: lotesQueue });
  const dispatchRemoveQueueLote = (id) => dispatchLotesQueue({ type: "DELETE_QUEUE_LOTE", payload: id });
  const dispatchAddQueueLote = (loteQueue) => dispatchLotesQueue({ type: "ADD_QUEUE_LOTE", payload: loteQueue });

  const [lotesCut, dispatchLotesCut] = useReducer(loteCutReducer, []);
  const dispatchAllCutLotes = (lotesCut) => dispatchLotesCut({ type: "GET_ALL_CUT_LOTES", payload: lotesCut });
  const dispatchRemoveCutLotes = (id) => dispatchLotesCut({ type: "DELETE_CUT_LOTE", payload: id });
  const dispatchAddCutLote = (loteCut) => dispatchLotesCut({ type: "ADD_CUT_LOTE", payload: loteCut })

  const [lotesPreparation, dispatchLotesPreparation] = useReducer(lotePreparationReducer, []);
  const dispatchAllPreparationLotes = (lotesPreparation) => dispatchLotesPreparation({ type: "GET_ALL_PREPARATION_LOTES", payload: lotesPreparation });
  const dispatchRemovePreparationLote = (id) => dispatchLotesPreparation({ type: "REMOVE_PREPARATION_LOTE", payload: id });

  const [lotesWorkshop, dispatchLotesWorkshop] = useReducer(loteWorkshopReducer, []);
  const dispatchAllWorkshopLotes = (lotesWorkshop) => dispatchLotesWorkshop({ type: "GET_ALL_WORKSHOP_LOTES", payload: lotesWorkshop });
  const dispatchRemoveWorkshopLote = (id) => dispatchLotesWorkshop({ type: "REMOVE_WORKSHOP_LOTE", payload: id });

  const [lotesControl, dispatchLotesControl] = useReducer(loteControlReducer, []);
  const dispatchAllControlLotes = (lotesControl) => dispatchLotesControl({ type: "GET_ALL_CONTROL_LOTES", payload: lotesControl });
  const dispatchRemoveControlLote = (id) => dispatchLotesControl({ type: "REMOVE_CONTROL_LOTE", payload: id });

  const [lotesFinalizado, dispatchLotesFinalizado] = useReducer(loteFinalizadoReducer, []);
  const dispatchAllFinalizadoLotes = (lotesFinalizado) => dispatchLotesFinalizado({ type: "GET_ALL_FINALIZADO_LOTES", payload: lotesFinalizado });
  const dispatchRemoveFinalizadoLote = (id) => dispatchLotesFinalizado({ type: "REMOVE_FINALIZADO_LOTE", payload: id });

  return (
    <LoteContext.Provider value={{
      lotes,
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
      statusHasChanged,
      setStatusHasChanged,
      lotesControl,
      dispatchAllControlLotes,
      dispatchRemoveControlLote,
      lotesFinalizado,
      dispatchAllFinalizadoLotes,
      dispatchRemoveFinalizadoLote,
      loteDbHasChanged,
      setLoteDbHasChanged,
      newLoteFormIsOpen,
      setNewLoteFormIsOpen
    }}>
      {children}
    </LoteContext.Provider>
  )

}