import { createContext, useReducer, useState } from "react";
import { inputReducer } from "../reducers/inputReducer";

export const EtiquetaContext = createContext();

export const EtiquetaProvider = ({ children }) => {

  const [etiquetas, dispatch] = useReducer(inputReducer, []);

  const dispatchAllEtiquetas = (etiquetas) => dispatch({ type: "GET_ALL", payload: etiquetas });

  const dispatchAddEtiqueta = (etiqueta) => dispatch({ type: "ADD", payload: etiqueta });

  const dispatchUpdateEtiqueta = (etiqueta) => dispatch({ type: "UPDATE", payload: etiqueta });

  const dispatchDeleteEtiqueta = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <EtiquetaContext.Provider value={
      {
        etiquetas,
        dispatchAllEtiquetas,
        dispatchAddEtiqueta,
        dispatchUpdateEtiqueta,
        dispatchDeleteEtiqueta
      }
    }>
      {children}
    </EtiquetaContext.Provider>
  )
}