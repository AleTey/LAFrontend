import { useContext, useState } from "react";
import { ModelContext } from "../context/ModelContext";
import { AuthContext } from "../auth/context/AuthContext.Jsx";

export const useModel = () => {

  const { models,
    dispatchAllModels,
    dispatchModel,
    dispatchUpdateModel,
    dispatchDeleteModel,
    modelDbHasChanged,
    setModelDbHasChanged } = useContext(ModelContext)

  const [paginator, setPaginator] = useState({});

  const { handlerLogout } = useContext(AuthContext);

  const getAllModels = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/models`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const json = await res.json();
      dispatchAllModels(json);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const saveModel = async (modelForm, setModelFormIsOpen) => {
    console.log(modelForm);
    const saveModel = await fetch(`${import.meta.env.VITE_API_BASE_URL}/models`, {
      method: 'POST',
      headers: {
        "Authorization": sessionStorage.getItem("token"),
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
      console.log("RESPUESTA MODEL")
      console.log(savedModel)
    } else {
      const error = await saveModel.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const updateModel = async (modelForm, setModelFormIsOpen) => {
    try {
      const updateModel = await fetch(`${import.meta.env.VITE_API_BASE_URL}/models/${modelForm.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": sessionStorage.getItem("token"),
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
      } else {
        const error = await updateModel.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  const deleteModel = async (id) => {
    const deleteModel = await fetch(`${import.meta.env.VITE_API_BASE_URL}/models/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (deleteModel.ok) {
      dispatchDeleteModel(id);
      setModelDbHasChanged("Modelo eliminado");
      setTimeout(() => setModelDbHasChanged(""), 8000)
    } else {
      const error = await deleteModel.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const findAllPageModel = async (page = 0, setPaginator) => {
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/models/find-all/page`);
    url.searchParams.append('page', page)
    url.searchParams.append('size', 2)
    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const resJson = await res.json();
      dispatchAllModels(resJson.content);
      setPaginator(resJson);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const getModelPageByString = async (string, page) => {
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/models/by-string/page`)
    url.searchParams.append('string', string);
    url.searchParams.append('page', page);
    url.searchParams.append('size', 2);

    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson);
      dispatchAllModels(resJson.content);
      setPaginator(resJson);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }

  }

  return {
    models,
    getAllModels,
    findAllPageModel,
    getModelPageByString,
    saveModel,
    updateModel,
    deleteModel,
    modelDbHasChanged,
    paginator,
    setPaginator
  }
}