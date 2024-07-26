import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.Jsx"

export const useTokenExpiration = () => {

  const { login, handlerLogout } = useContext(AuthContext);
  
  console.log("check token")
  if (login.user && login.user.exp < Date.now()) {
    handlerLogout();
  }

}