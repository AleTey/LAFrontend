import { useState } from "react"
import { LoteCard } from "./LoteCard";

export const FabricCutQueue = ({ queueLotes }) => {

  const [unfinishedLotes, setUnfinishedLotes] = useState([]);
  // const [queueLotes, setQueueLotes] = useState([]);
  const [preparationLotes, setPreparationLotes] = useState([]);
  const [workShopLotes, setWorkShopLotes] = useState([]);
  const [controlLotes, setControlLotes] = []

  // const findLotesByState = (state) => {
  //   const getLotesByState = async (state) => {
  //     const lotes = await fetch(`http://localhost:8080/lotes/by-state/${state}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     if (lotes.ok) {
  //       const lotesJson = await lotes.json();
  //     }
  //   }
  //   getLotesByState(state);
  // }


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

      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Estado</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table> */}
    </>
  )
}