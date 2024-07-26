import { createContext, useContext, useReducer } from "react"
import { useAuth } from "../hook/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const { login, handlerLogin, handlerLogout } = useAuth();

  return (
    <AuthContext.Provider value={
      {
        login,
        handlerLogin,
        handlerLogout
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}