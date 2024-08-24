import { createContext, useReducer, useState } from "react";
import { modelReducer } from "../reducers/modelReducer";

export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {

  const [models, dispatch] = useReducer(modelReducer, []);

  const [modelDbHasChanged, setModelDbHasChanged] = useState("");

  const [modelIsLoading, setModelIsLoading] = useState(false);

  const dispatchAllModels = (models) => dispatch({ type: "GET_ALL_MODELS", payload: models });

  const dispatchModel = (model) => dispatch({ type: "ADD_MODEL", payload: model });

  const dispatchUpdateModel = (model) => dispatch({ type: "UPDATE_MODEL", payload: model });

  const dispatchDeleteModel = (id) => dispatch({ type: "DELETE_MODEL", payload: id });

  return (
    <ModelContext.Provider value={{
      models,
      dispatchAllModels,
      dispatchModel,
      dispatchUpdateModel,
      dispatchDeleteModel,
      modelDbHasChanged,
      setModelDbHasChanged,
      modelIsLoading, 
      setModelIsLoading
    }}>
      {children}
    </ModelContext.Provider>
  )

}