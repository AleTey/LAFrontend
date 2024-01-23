import { useReducer, useState } from "react";
import Swal from "sweetalert2";
import { fabricReducer } from "../reducers/fabricReducer";


export const useFabric = () => {

  const [supplies, setSupplies] = useState([]);

  const [fabricModalIsOpen, setFabricModalIsOpen] = useState(false);

  const [fabricWasAdded, setFabricWasAdded] = useState(false);
  const [fabricWasEdited, setFabricWasEdited] = useState(false);
  const [fabricWasDeleted, setFabricWasDeleted] = useState(false);
  const [fabricErrorFetch, setFabricErrorFetch] = useState("");

  const [fabrics, dispatch] = useReducer(fabricReducer, []);

  const onNewFabric = () => {
    setFabricModalIsOpen(true);
  }

  // const getAllFabrics = async () => {
  //   // const res = await fetch("http://localhost:3000/colors");
  //   const res = await fetch("http://localhost:8080/fabrics");
  //   if (res.ok) {
  //     const json = await res.json();
  //     console.log(json);
  //     dispatch({
  //       type: 'GET_ALL_FABRICS',
  //       payload: json
  //     })
  //   }
  // }

  const getAllFabrics = async () => {
    try {
      const res = await fetch("http://localhost:8080/fabrics");
      const json = await res.json();

      // Procesar la respuesta y convertir la imagen en una URL
      const fabricsWithImageURL = json.map((fabric) => {
        const imageBase64 = fabric.img; // Suponiendo que 'img' contiene los datos binarios de la imagen
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

        return {
          ...fabric,
          img: imageUrl,
        };
      });

      dispatch({
        type: 'GET_ALL_FABRICS',
        payload: fabricsWithImageURL,
      });
    } catch (error) {
      console.error('Error fetching fabrics:', error);
    }
  }


  const addNewFabric = async (fabricForm) => {
    try {
      const response = await fetch("http://localhost:3000/colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fabricForm)
      })
      if (response.ok) {
        const json = await response.json();
        setFabricWasAdded(true)
        dispatch({
          type: 'ADD_FABRIC',
          payload: json
        })
        setTimeout(() => {
          setFabricWasAdded(false)
        }, 8000)
        setFabricModalIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      setFabricErrorFetch("Ocurrió un error al intentar agregar una nueva tela");
      setTimeout(() => {
        setFabricErrorFetch("");
      }, 8000)
    }
  }

  const editFabric = async (fabricForm) => {
    console.log(fabricForm);
    try {
      console.log("Entrando al try");
      const response = await fetch(`http://localhost:3000/colors/${fabricForm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fabricForm)
      });
      console.log(response);
      if (response.ok) {
        const json = await response.json();
        setFabricWasEdited(true);
        dispatch({
          type: "EDIT_FABRIC",
          payload: fabricForm
        })
        setTimeout(() => {
          setFabricWasEdited(false);
        }, 8000)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onDeleteFabric = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteFabric = async () => {
          try {
            // const response = await fetch(`http://localhost:3000/colors/${id}`, {
            const response = await fetch(`http://localhost:3000/colors/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
            })
            if (response.ok) {
              const json = response.json();
              dispatch({
                type: "REMOVE_FABRIC",
                payload: id
              });
              setFabricWasDeleted(true);
              setTimeout(() => {
                setFabricWasDeleted(false);
              }, 8000)
            }
          } catch (error) {
            console.log(error);
          }
        }
        deleteFabric();

      }
    })


  }

  return {
    fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabrics,
    addNewFabric,
    editFabric,
    onDeleteFabric,
  }
}