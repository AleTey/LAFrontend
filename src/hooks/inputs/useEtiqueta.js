import { useContext } from "react"
import { EtiquetaContext } from "../../context/EtiquetaContext"
import { InputModalContext } from "../../context/InputModalContext";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";

export const useEtiqueta = () => {
  const { etiquetas,
    dispatchAllEtiquetas,
    dispatchAddEtiqueta,
    dispatchUpdateEtiqueta,
    dispatchDeleteEtiqueta } = useContext(EtiquetaContext);

  const { modalSelectionHandler, toggle, setInputDbHasChanged } = useContext(InputModalContext);

  const { handlerLogout } = useContext(AuthContext);


  const findAllEtiquetas = async () => {
    const getAllEtiquetas = await fetch(`${import.meta.env.VITE_API_BASE_URL}/etiquetas`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (getAllEtiquetas.ok) {
      const etiquetasJson = await getAllEtiquetas.json();
      dispatchAllEtiquetas(etiquetasJson);
    } else {
      const error = await getAllEtiquetas.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const addEtiqueta = async (etiqueta) => {
    if (etiquetas.length === 0) {

    }
    const addEtiqueta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/etiquetas`, {
      method: "POST",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
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
    } else {
      const error = await addEtiqueta.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const updateEtiqueta = async (id, modifiedEtiqueta, formIsOpen) => {

    const params = new URLSearchParams(modifiedEtiqueta).toString();

    const updateEtiqueta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/etiquetas/${id}?${params}`, {
      method: "PUT",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
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
    } else {
      const error = await updateEtiqueta.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }


  const deleteEtiqueta = async (id) => {
    const deleteEtiqueta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/etiquetas/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (deleteEtiqueta.ok) {
      dispatchDeleteEtiqueta(id);
      modalSelectionHandler("Etiqueta eliminada")
      setTimeout(() => {
        modalSelectionHandler("")
      }, 8000)
    } else {
      const error = await deleteEtiqueta.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
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