import { createContext, useReducer } from "react";
import { correderaReducer } from "../reducers/correderaReducer";

export const CorrederaContext = createContext();


export const CorrederaProvider = ({ children }) => {

  const [correderas, dispatch] = useReducer(correderaReducer, []);

  const dispatchGetAllCorrederas = (correderas) => dispatch({ type: "GET_ALL_CORREDERAS", payload: correderas });

  const dispatchAddCorredera = (corredera) => dispatch({ type: "ADD_CORREDERA", payload: corredera });

  const dispatchUploadCorredera = (corredera) => dispatch({ type: "UPDATE_CORREDERA", payload: corredera });

  const dispatchDeleteCorredera = (id) => dispatch({ type: "DELETE_CORREDERA", payload: id });

  return (
    <CorrederaContext.Provider value={
      {
        correderas,
        dispatchGetAllCorrederas,
        dispatchAddCorredera,
        dispatchUploadCorredera,
        dispatchDeleteCorredera
      }
    }>
      {children}
    </CorrederaContext.Provider>
  )
}