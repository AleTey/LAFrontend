import { useContext } from "react"
import { ApliquesContext } from "../../context/ApliquesContext"
import { useInputModal } from "./useInputModal";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";

export const useAplique = () => {

  const { apliques,
    dispatchAllApliques,
    dispatchAddAplique,
    dispatchUpdateAplique,
    dispatchDeleteAplique } = useContext(ApliquesContext);

  const { toggle,
    modalSelectionHandler,
    setInputDbHasChanged } = useInputModal();

  const { handlerLogout } = useContext(AuthContext);

  const findAllApliques = async () => {
    const findApliques = await fetch(`${import.meta.env.VITE_API_BASE_URL}/apliques`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (findApliques.ok) {
      const apliquesJson = await findApliques.json();
      dispatchAllApliques(apliquesJson);
    } else {
      const error = await findApliques.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const addAplique = async (aplique) => {
    const addAplique = await fetch(`${import.meta.env.VITE_API_BASE_URL}/apliques`, {
      method: "POST",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(aplique)
    });
    if (addAplique.ok) {
      const apliqueJson = await addAplique.json();
      dispatchAddAplique(apliqueJson)
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged('Aplique guardado')
      setTimeout(() => setInputDbHasChanged(""), 8000)
    } else {
      const error = await addAplique.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const deleteAplique = async (id) => {
    const deleteAplique = await fetch(`${import.meta.env.VITE_API_BASE_URL}/apliques/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }

    })
    if (deleteAplique.ok) {
      dispatchDeleteAplique(id);
      setInputDbHasChanged('Aplique eliminado');
      setTimeout(() => setInputDbHasChanged(""), 8000);
    } else {
      const error = await deleteAplique.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }


  const updateAplique = async (id, modifiedFields, formIsOpen) => {
    const params = new URLSearchParams(modifiedFields).toString();
    const updateAplique = await fetch(`${import.meta.env.VITE_API_BASE_URL}/apliques/${id}?${params}`, {
      method: "PUT",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (updateAplique.ok) {
      const apliqueJson = await updateAplique.json();
      dispatchUpdateAplique(apliqueJson)
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged('Aplique editado');
      setTimeout(() => setInputDbHasChanged(""), 8000);
      formIsOpen(false);
    } else {
      const error = await updateAplique.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  return {
    apliques,
    findAllApliques,
    addAplique,
    updateAplique,
    deleteAplique
  }
}