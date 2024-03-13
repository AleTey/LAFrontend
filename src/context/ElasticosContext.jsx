import { createContext, useContext, useReducer } from "react";
import { elasticoReducer } from "../reducers/elasticoReducer";

export const ElasticosContext = createContext();


export const ElasticosProvider = ({ children }) => {

  const [elasticos, dispatch] = useReducer(elasticoReducer, []);

  const dispatchAllElasticos = (elasticos) => dispatch({ type: "GET_ALL_ELASTICOS", payload: elasticos })

  const dispatchAddElastico = (elastico) => dispatch({ type: "ADD_ELASTICO", payload: elastico });

  const dispatchUpdateElastico = (elastico) => dispatch({ type: "UPDATE_ELASTICO", payload: elastico });

  const dispatchDeleteElastico = (id) => dispatch({ type: "DELETE_ELASTICO", payload: id });

  return (
    <ElasticosContext.Provider value={{
      elasticos,
      dispatchAllElasticos,
      dispatchAddElastico,
      dispatchUpdateElastico,
      dispatchDeleteElastico
    }}>
      {children}
    </ElasticosContext.Provider>
  )

}
