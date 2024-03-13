import { useContext } from "react"
import { ArgollaContext } from "../../context/ArgollaContext"
import { useInputModal } from "./useInputModal"
import Swal from "sweetalert2";


export const useArgolla = () => {


  const { argollas,
    dispatchAllArgollas,
    dispatchAddArgolla,
    dispatchUpdateArgolla,
    dispatchDeleteArgolla } = useContext(ArgollaContext)

  const { toggle, modalSelectionHandler, setInputDbHasChanged } = useInputModal();


  const findAllArgollas = async () => {
    const getArgollas = await fetch("http://localhost:8080/argollas");
    if (getArgollas.ok) {
      const argollasJson = await getArgollas.json();

      dispatchAllArgollas(argollasJson);
    }
  }


  const addNewArgolla = async (argollaForm) => {

    if (argollas.length === 0) {
      findAllArgollas();
    }

    const addArgolla = await fetch("http://localhost:8080/argollas", {
      method: "POST",
      headers: {
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
    }
  }


  const updateArgolla = async (modifiedFields, id, formIsOpen) => {


    const params = new URLSearchParams(modifiedFields).toString();

    const updateArgolla = await fetch(`http://localhost:8080/argollas/${id}?${params}`, {
      method: "PUT",
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
    }
  }

  const deleteArgolla = async (id) => {
    try {
      const deleteArgolla = await fetch(`http://localhost:8080/argollas/${id}`, {
        method: "DELETE",
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
        swalWithBootstrapButtons.fire({
          title: "Ocurrió un error",
          text: "Your file has been deleted.",
          icon: "error"
        });
      }
    } catch (error) {
      console.log(error);
      // swalWithBootstrapButtons.fire({
      //   title: "Ocurrió un error",
      //   text: { error },
      //   icon: "error"
      // });
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