import { useContext } from "react";
import { ModelContext } from "../context/ModelContext";

export const useModel = () => {

  const { models,
    dispatchAllModels,
    dispatchModel,
    dispatchUpdateModel,
    dispatchDeleteModel,
    modelDbHasChanged,
    setModelDbHasChanged } = useContext(ModelContext)

  const getAllModels = async () => {
    const res = await fetch("http://localhost:8080/models")
    const json = await res.json();
    // setModels(json);
    dispatchAllModels(json);
  }

  const saveModel = async (modelForm, setModelFormIsOpen) => {
    const saveModel = await fetch("http://localhost:8080/models", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelForm)
    })
    if (saveModel.ok) {
      const savedModel = await saveModel.json();
      setModelFormIsOpen(false)
      dispatchModel(savedModel);
      setModelDbHasChanged("Modelo guardado")
      setTimeout(() => setModelDbHasChanged(""), 8000)

    }
  }

  const updateModel = async (modelForm, setModelFormIsOpen) => {
    try {
      const updateModel = await fetch(`http://localhost:8080/models/${modelForm.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(modelForm)
      })
      if (updateModel.ok) {
        const updatedModelJson = await updateModel.json();
        dispatchUpdateModel(updatedModelJson);
        setModelFormIsOpen(false);
        setModelDbHasChanged("Modelo actualizado")
        setTimeout(() => setModelDbHasChanged(""), 8000);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const deleteModel = async (id) => {
    const deleteModel = await fetch(`http://localhost:8080/models/${id}`, {
      method: 'DELETE',
    })
    if (deleteModel.ok) {
      dispatchDeleteModel(id);
      setModelDbHasChanged("Modelo eliminado");
      setTimeout(() => setModelDbHasChanged(""), 8000)
    }
  }

  return {
    models,
    getAllModels,
    saveModel,
    updateModel,
    deleteModel,
    modelDbHasChanged
  }
}