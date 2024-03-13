import { useContext, useReducer } from "react"
import { InputsContext } from "../../context/InputsContext"
import { useInputModal } from "./useInputModal";
import Swal from "sweetalert2";
import { elasticoReducer } from "../../reducers/elasticoReducer";
import { ElasticosContext } from "../../context/ElasticosContext";


export const useElastico = () => {

  // const { elasticosDb, setElasticosDb } = useContext(InputsContext);

  const { elasticos,
    dispatchAllElasticos,
    dispatchAddElastico,
    dispatchUpdateElastico,
    dispatchDeleteElastico } = useContext(ElasticosContext);

  const { toggle, modalSelectionHandler, setInputDbHasChanged } = useInputModal();

  // const [elasticos, dispatch] = useReducer(elasticoReducer, elasticosDb);



  const findAllElasticos = async () => {
    const getElasticos = await fetch("http://localhost:8080/elasticos")
    if (getElasticos.ok) {
      const elasticosJson = await getElasticos.json();

      dispatchAllElasticos(elasticosJson);

    }
  }

  const addElastico = async (elasticoForm) => {

    if (elasticos.length === 0) {
      findAllElasticos()
    }

    try {
      const saveElastico = await fetch("http://localhost:8080/elasticos", {
        method: "POST",
        headers: {
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

      const putElastico = await fetch(`http://localhost:8080/elasticos/${id}?${params}`, {
        method: "PUT",
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
      }

    } catch (error) {
      console.log(error);
    }
  }

  const deleteElastico = async (id) => {

    try {

      const deleteElastico = await fetch(`http://localhost:8080/elasticos/${id}`, {
        method: "DELETE",
        headers: {
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