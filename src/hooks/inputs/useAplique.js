import { useContext } from "react"
import { ApliquesContext } from "../../context/ApliquesContext"
import { useInputModal } from "./useInputModal";

export const useAplique = () => {

  const { apliques,
    dispatchAllApliques,
    dispatchAddAplique,
    dispatchUpdateAplique,
    dispatchDeleteAplique } = useContext(ApliquesContext);

  const { toggle,
    modalSelectionHandler,
    setInputDbHasChanged } = useInputModal();

  const findAllApliques = async () => {
    const findApliques = await fetch("http://localhost:8080/apliques");
    if (findApliques.ok) {
      const apliquesJson = await findApliques.json();
      dispatchAllApliques(apliquesJson);
    }
  }

  const addAplique = async (aplique) => {
    const addAplique = await fetch("http://localhost:8080/apliques", {
      method: "POST",
      headers: {
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
    }
  }

  const deleteAplique = async (id) => {
    const deleteAplique = await fetch(`http://localhost:8080/apliques/${id}`, {
      method: "DELETE"
    })
    if (deleteAplique.ok) {
      dispatchDeleteAplique(id);
      setInputDbHasChanged('Aplique eliminado');
      setTimeout(() => setInputDbHasChanged(""), 8000);
    }
  }


  const updateAplique = async (id, modifiedFields, formIsOpen) => {
    const params = new URLSearchParams(modifiedFields).toString();
    const updateAplique = await fetch(`http://localhost:8080/apliques/${id}?${params}`, {
      method: "PUT"
    });
    if (updateAplique.ok) {
      const apliqueJson = await updateAplique.json();
      dispatchUpdateAplique(apliqueJson)
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged('Aplique editado');
      setTimeout(() => setInputDbHasChanged(""), 8000);
      formIsOpen(false);
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