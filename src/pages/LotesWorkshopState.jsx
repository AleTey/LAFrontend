import { useContext, useEffect, useState } from "react"
import { LoteCard } from "../components/LoteCard";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { useLote } from "../hooks/lotes/useLote";

export const LotesWorkshopState = () => {

  // const [lotes, setLotes] = useState([]);

  const { lotesWorkshop } = useLote();

  const { login, handlerLogout } = useContext(AuthContext);

  const { getLotesForWorkshop, loteWithImgMapper } = useLote();

  useEffect(() => {
    getLotesForWorkshop();
  }, [])



  return (
    <>
      <div className="container-sm">
        <h3 className="my-3">Cortes</h3>

        {
          lotesWorkshop?.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }
      </div>
    </>
  )
}