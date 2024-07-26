import { useContext, useState } from "react";
import { GanchosContext } from "../../context/GanchosContext";
import { useInputModal } from "./useInputModal";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";


export const useGancho = () => {

  const { ganchos,
    dispatchGetAllGanchos,
    dispatchAddGancho,
    dispatchUpdateGancho,
    dispatchDeleteGancho } = useContext(GanchosContext);

  const { toggle, modalSelectionHandler, setInputDbHasChanged } = useInputModal();

  const [dataEnumTipoGancho, setDataEnumTipoGancho] = useState();

  const { handlerLogout } = useContext(AuthContext);

  const findAllGanchos = async () => {
    const getGanchos = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ganchos`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (getGanchos.ok) {
      const ganchosJson = await getGanchos.json()
      // console.log(ganchosJson)
      dispatchGetAllGanchos(ganchosJson)
    } else {
      const error = await getGanchos.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const addGancho = async (ganchoForm) => {
    const addGancho = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ganchos`, {
      method: "POST",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ganchoForm)
    })
    if (addGancho.ok) {
      const ganchoJson = await addGancho.json();
      dispatchAddGancho(ganchoJson);
      toggle();
      modalSelectionHandler("")
      setInputDbHasChanged("Gancho agregado");
      setTimeout(() => {
        setInputDbHasChanged("")
      }, 8000)
    } else {
      const error = await addGancho.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }

  }

  const updateGancho = async (modifiedFields, id, formIsOpen) => {
    const params = new URLSearchParams(modifiedFields).toString();
    console.log(params);

    const updateGancho = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ganchos/${id}?${params}`, {
      method: "PUT",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })

    if (updateGancho.ok) {
      const ganchoJson = await updateGancho.json();
      dispatchUpdateGancho(ganchoJson);
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged("Gancho actualizado");
      setTimeout(() => setInputDbHasChanged(""), 8000)
      formIsOpen(false);
    } else {
      const error = await updateGancho.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const deleteGancho = async (id) => {
    const deleteGancho = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ganchos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })

    if (deleteGancho.ok) {

      dispatchDeleteGancho(id)
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Argolla eliminada con exito.",
        icon: "success"
      });
    } else {
      const error = await deleteGancho.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const getTipoGanchos = async (setTipoGanchos) => {
    console.log("en el use Effect de GanchoForm")
    const tipoGanchos = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tiposGancho`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (tipoGanchos.ok) {
      console.log(tipoGanchos)
      const tipoGanchosJson = await tipoGanchos.json();
      setTipoGanchos(tipoGanchosJson);
    }
  }

  return (
    {
      ganchos,
      findAllGanchos,
      addGancho,
      updateGancho,
      deleteGancho,
      dataEnumTipoGancho,
      setDataEnumTipoGancho,
      getTipoGanchos
    }
  )

}