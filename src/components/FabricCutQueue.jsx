import { useState } from "react"
import { LoteCard } from "./LoteCard";

export const FabricCutQueue = ({ queueLotes }) => {

  const [unfinishedLotes, setUnfinishedLotes] = useState([]);
  // const [queueLotes, setQueueLotes] = useState([]);
  const [preparationLotes, setPreparationLotes] = useState([]);
  const [workShopLotes, setWorkShopLotes] = useState([]);
  const [controlLotes, setControlLotes] = []


  // =====================================================
  //                  FUERA DE SERVICIO
  // =====================================================

  return (
    <>

      {
        queueLotes && queueLotes.map(lote => (
          <LoteCard
            key={lote.id}
            lote={lote}
          />
        ))
      }
    </>
  )
}