import { useContext } from "react"
import { ArgollaContext } from "../../context/ArgollaContext"
import { useInputModal } from "./useInputModal"
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";


export const useArgolla = () => {


  const { argollas,
    dispatchAllArgollas,
    dispatchAddArgolla,
    dispatchUpdateArgolla,
    dispatchDeleteArgolla } = useContext(ArgollaContext)

  const { toggle, modalSelectionHandler, setInputDbHasChanged } = useInputModal();

  const {handlerLogout} = useContext(AuthContext);


  const findAllArgollas = async () => {
    const getArgollas = await fetch(`${import.meta.env.VITE_API_BASE_URL}/argollas`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (getArgollas.ok) {
      const argollasJson = await getArgollas.json();

      dispatchAllArgollas(argollasJson);
    } else {
      const error = await getArgollas.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }


  const addNewArgolla = async (argollaForm) => {

    if (argollas.length === 0) {
      findAllArgollas();
    }

    const addArgolla = await fetch(`${import.meta.env.VITE_API_BASE_URL}/argollas`, {
      method: "POST",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(argollaForm)
    })
    if (addArgolla.ok) {
      const addArgollaJson = await addArgolla.json();
      dispatchAddArgolla(addArgollaJson);
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged("Argolla agregada")
      setTimeout(() => {
        setInputDbHasChanged("")
      }, 8000)
    } else {
      const error = await addArgolla.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }


  const updateArgolla = async (modifiedFields, id, formIsOpen) => {


    const params = new URLSearchParams(modifiedFields).toString();

    const updateArgolla = await fetch(`${import.meta.env.VITE_API_BASE_URL}/argollas/${id}?${params}`, {
      method: "PUT",
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (updateArgolla.ok) {
      const updateArgollaJson = await updateArgolla.json();
      dispatchUpdateArgolla(updateArgollaJson);
      toggle();
      modalSelectionHandler("");
      setInputDbHasChanged("Argolla modificada");
      setTimeout(() => {
        setInputDbHasChanged("");
      }, 8000)
      formIsOpen(false);
    } else {
      const error = await updateArgolla.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const deleteArgolla = async (id) => {
    try {
      const deleteArgolla = await fetch(`${import.meta.env.VITE_API_BASE_URL}/argollas/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      })
      if (deleteArgolla.ok) {

        dispatchDeleteArgolla(id);
        setInputDbHasChanged(true);
        setTimeout(() => {
          setInputDbHasChanged(false);
        }, 8000)

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Argolla eliminada con exito.",
          icon: "success"
        });
      } else {
        const error = await getElasticos.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }

        swalWithBootstrapButtons.fire({
          title: "Ocurrió un error",
          text: "Your file has been deleted.",
          icon: "error"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  return {
    argollas,
    findAllArgollas,
    addNewArgolla,
    updateArgolla,
    deleteArgolla
  }

}