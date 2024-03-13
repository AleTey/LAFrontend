import { useContext } from "react"
import { EtiquetaContext } from "../../context/EtiquetaContext"
import { InputModalContext } from "../../context/InputModalContext";

export const useEtiqueta = () => {
  const { etiquetas,
    dispatchAllEtiquetas,
    dispatchAddEtiqueta,
    dispatchUpdateEtiqueta,
    dispatchDeleteEtiqueta } = useContext(EtiquetaContext);

  const { modalSelectionHandler, toggle, setInputDbHasChanged } = useContext(InputModalContext);

  const findAllEtiquetas = async () => {
    const getAllEtiquetas = await fetch("http://localhost:8080/etiquetas");
    if (getAllEtiquetas.ok) {
      const etiquetasJson = await getAllEtiquetas.json();
      dispatchAllEtiquetas(etiquetasJson);
    }
  }

  const addEtiqueta = async (etiqueta) => {
    if (etiquetas.length === 0) {

    }
    const addEtiqueta = await fetch("http://localhost:8080/etiquetas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(etiqueta)
    });

    if (addEtiqueta.ok) {
      const etiquetaJson = await addEtiqueta.json();
      dispatchAddEtiqueta(etiquetaJson)
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged("Etiqueta guardada");
      setTimeout(() => {
        setInputDbHasChanged("");
      }, 8000)
    }
  }

  const updateEtiqueta = async (id, modifiedEtiqueta, formIsOpen) => {

    const params = new URLSearchParams(modifiedEtiqueta).toString();

    const updateEtiqueta = await fetch(`http://localhost:8080/etiquetas/${id}?${params}`, {
      method: "PUT"
    })
    if (updateEtiqueta.ok) {
      const etiquetaJson = await updateEtiqueta.json();
      dispatchUpdateEtiqueta(etiquetaJson)
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged("Etiqueta editada");
      setTimeout(() => {
        setInputDbHasChanged("");
      }, 8000)
      formIsOpen(false);
    }
  }


  const deleteEtiqueta = async (id) => {
    const deleteEtiqueta = await fetch(`http://localhost:8080/etiquetas/${id}`, {
      method: "DELETE"
    })
    if (deleteEtiqueta.ok) {
      modalSelectionHandler("Etiqueta eliminada")
      setTimeout(() => {
        modalSelectionHandler("")
      }, 8000)
    }
  }


  return {
    etiquetas,
    findAllEtiquetas,
    deleteEtiqueta,
    addEtiqueta,
    updateEtiqueta
  }
}