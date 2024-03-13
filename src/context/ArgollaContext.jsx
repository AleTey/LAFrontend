import { createContext, useReducer } from "react";
import { inputReducer } from "../reducers/inputReducer";

export const ArgollaContext = createContext();

export const ArgollaProvider = ({ children }) => {

  const [argollas, dispatch] = useReducer(inputReducer, []);

  const dispatchAllArgollas = (argollas) => dispatch({ type: "GET_ALL", payload: argollas });

  const dispatchAddArgolla = (argolla) => dispatch({ type: "ADD", payload: argolla });

  const dispatchUpdateArgolla = (argolla) => dispatch({ type: "UPDATE", payload: argolla });

  const dispatchDeleteArgolla = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <ArgollaContext.Provider value={
      {
        argollas,
        dispatchAllArgollas,
        dispatchAddArgolla,
        dispatchUpdateArgolla,
        dispatchDeleteArgolla
      }
    }>
      {children}
    </ArgollaContext.Provider>
  )

}