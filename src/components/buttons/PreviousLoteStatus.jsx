import { useState } from "react";
import { useLote } from "../../hooks/lotes/useLote"
import { areUSure } from "../alerts/areUSure";

export const PreviousLoteStatus = ({ loteId, status }) => {

  const { previousState, changeStateAdmin } = useLote();

  const [canceled, setCanceled] = useState(true);

  const handleClick = () => {
    changeStateAdmin(loteId, previousState(status), "prev")
  }


  return (
    <>
      <button
        className="btn btp-danger"
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
          <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
          <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
        </svg>
      </button>
    </>
  )
}