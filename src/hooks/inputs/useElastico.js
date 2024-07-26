import { useContext, useReducer } from "react"
import { InputsContext } from "../../context/InputsContext"
import { useInputModal } from "./useInputModal";
import Swal from "sweetalert2";
import { elasticoReducer } from "../../reducers/elasticoReducer";
import { ElasticosContext } from "../../context/ElasticosContext";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";


export const useElastico = () => {

  // const { elasticosDb, setElasticosDb } = useContext(InputsContext);

  const { elasticos,
    dispatchAllElasticos,
    dispatchAddElastico,
    dispatchUpdateElastico,
    dispatchDeleteElastico } = useContext(ElasticosContext);

  const { toggle, modalSelectionHandler, setInputDbHasChanged } = useInputModal();

  const { handlerLogout } = useContext(AuthContext);



  const findAllElasticos = async () => {
    const getElasticos = await fetch(`${import.meta.env.VITE_API_BASE_URL}/elasticos`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (getElasticos.ok) {
      const elasticosJson = await getElasticos.json();

      dispatchAllElasticos(elasticosJson);

    } else {
      const error = await getElasticos.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const addElastico = async (elasticoForm) => {

    if (elasticos.length === 0) {
      findAllElasticos()
    }

    try {
      const saveElastico = await fetch(`${import.meta.env.VITE_API_BASE_URL}/elasticos`, {
        method: "POST",
        headers: {
          "Authorization": sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(elasticoForm)
      })

      if (saveElastico.ok) {
        const saveElasticoJson = await saveElastico.json();

        dispatchAddElastico(saveElasticoJson);

        toggle();
        modalSelectionHandler("");
        setInputDbHasChanged("elasticoSaved")
        setTimeout(() => {
          setInputDbHasChanged("")
        }, 8000)
      } else {
        const error = await saveElastico.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }

    } catch (error) {
      console.log("Error al guardar el elastico: " + error)
    }

  }

  const updateElastico = async (modifiedFields, id, formIsOpen) => {

    if (modifiedFields.proveedor) {
      modifiedFields.proveedor = modifiedFields.proveedor.id;
    }

    const params = new URLSearchParams(modifiedFields).toString();

    // console.log(`http://localhost:8080/elasticos/${id}?${params}`);

    try {

      const putElastico = await fetch(`${import.meta.env.VITE_API_BASE_URL}/elasticos/${id}?${params}`, {
        method: "PUT",
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      })

      if (putElastico.ok) {
        const updatedElasticoJson = await putElastico.json();

        dispatchUpdateElastico(updatedElasticoJson);

        toggle();
        modalSelectionHandler("");
        setInputDbHasChanged("elasticoUpdated")
        setTimeout(() => {
          setInputDbHasChanged("")
        }, 8000)
        formIsOpen(false);
      } else {
        const error = await putElastico.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const deleteElastico = async (id) => {

    try {

      const deleteElastico = await fetch(`${import.meta.env.VITE_API_BASE_URL}/elasticos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })


      if (deleteElastico.ok) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        dispatchDeleteElastico(id);
        setInputDbHasChanged("elasticoDeleted");
        setTimeout(() => {
          setInputDbHasChanged("");
        }, 8000)

      } else {
        const error = await deleteElastico.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  return {
    elasticos,
    findAllElasticos,
    addElastico,
    updateElastico,
    deleteElastico
  }

}