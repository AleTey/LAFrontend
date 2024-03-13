import { createContext, useReducer } from "react";
import { inputReducer } from "../reducers/inputReducer";

export const ApliquesContext = createContext();

export const ApliquesProvider = ({ children }) => {

  const [apliques, dispatch] = useReducer(inputReducer, []);

  const dispatchAllApliques = (apliques) => dispatch({ type: "GET_ALL", payload: apliques });

  const dispatchAddAplique = (aplique) => dispatch({ type: "ADD", payload: aplique });

  const dispatchUpdateAplique = (aplique) => dispatch({ type: "UPDATE", payload: aplique });

  const dispatchDeleteAplique = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <ApliquesContext.Provider value={
      {
        apliques,
        dispatchAllApliques,
        dispatchAddAplique,
        dispatchUpdateAplique,
        dispatchDeleteAplique
      }
    }>
      {children}
    </ApliquesContext.Provider>
  )
}