import { useContext, useState } from "react";
import { GanchosContext } from "../../context/GanchosContext";
import { useInputModal } from "./useInputModal";
import Swal from "sweetalert2";


export const useGancho = () => {

  const { ganchos,
    dispatchGetAllGanchos,
    dispatchAddGancho,
    dispatchUpdateGancho,
    dispatchDeleteGancho } = useContext(GanchosContext);

  const { toggle, modalSelectionHandler, setInputDbHasChanged } = useInputModal();

  const [dataEnumTipoGancho, setDataEnumTipoGancho] = useState();

  const findAllGanchos = async () => {
    const getGanchos = await fetch("http://localhost:8080/ganchos");
    if (getGanchos.ok) {
      const ganchosJson = await getGanchos.json()
      // console.log(ganchosJson)
      dispatchGetAllGanchos(ganchosJson)
    }
  }

  const addGancho = async (ganchoForm) => {
    const addGancho = await fetch("http://localhost:8080/ganchos", {
      method: "POST",
      headers: {
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
    }

  }

  const updateGancho = async (modifiedFields, id, formIsOpen) => {
    const params = new URLSearchParams(modifiedFields).toString();
    console.log(params);

    const updateGancho = await fetch(`http://localhost:8080/ganchos/${id}?${params}`, {
      method: "PUT"
    })

    if (updateGancho.ok) {
      const ganchoJson = await updateGancho.json();
      dispatchUpdateGancho(ganchoJson);
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged("Gancho actualizado");
      setTimeout(() => setInputDbHasChanged(""), 8000)
      formIsOpen(false);
    }
  }

  const deleteGancho = async (id) => {
    const deleteGancho = await fetch(`http://localhost:8080/ganchos/${id}`, {
      method: "DELETE",
    })

    if (deleteGancho.ok) {

      dispatchDeleteGancho(id)
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Argolla eliminada con exito.",
        icon: "success"
      });
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
      setDataEnumTipoGancho
    }
  )

}