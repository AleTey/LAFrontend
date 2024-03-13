import { createContext, useReducer } from "react";
import { inputReducer } from "../reducers/inputReducer";

export const GanchosContext = createContext();

export const GanchosProvider = ({ children }) => {

  const [ganchos, dispatch] = useReducer(inputReducer, [])

  const dispatchGetAllGanchos = (ganchos) => dispatch({ type: "GET_ALL", payload: ganchos });

  const dispatchAddGancho = (gancho) => dispatch({ type: "ADD", payload: gancho });

  const dispatchUpdateGancho = (gancho) => dispatch({ type: "UPDATE", payload: gancho });

  const dispatchDeleteGancho = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <GanchosContext.Provider value={
      {
        ganchos,
        dispatchGetAllGanchos,
        dispatchAddGancho,
        dispatchUpdateGancho,
        dispatchDeleteGancho
      }
    }>
      {children}
    </GanchosContext.Provider>
  )
}