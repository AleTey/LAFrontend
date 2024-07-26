import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext.Jsx";

export const useWorkshop = () => {

  const { handlerLogout } = useContext(AuthContext);


  const findWorkshops = async (setWorkshops) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/workshops`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });

    if (res.ok) {
      const workshopsJson = await res.json();
      setWorkshops(workshopsJson);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  return {
    findWorkshops
  }
}