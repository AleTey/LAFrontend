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

  // const [fabricWUrlImage, setFabricWUrlImage] = useState({});

  const [fabrics, dispatch] = useReducer(fabricReducer, []);

  const [paginator, setPaginator] = useState({});

  const onNewFabric = () => {
    setFabricModalIsOpen(true);
  }

  const getAllFabrics = async () => {
    try {
      const res = await fetch("http://localhost:8080/fabrics");
      const json = await res.json();

      const fabricsWithImageURL = json.map((fabric) => {

        const imageBase64 = fabric.img;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        if (fabric.img) {
          return {
            ...fabric,
            img: imageUrl,
          };
        }
        return {
          ...fabric,
          img: null,
        };
      });

      dispatch({
        type: 'GET_ALL_FABRICS',
        payload: fabricsWithImageURL,
      });
      // console.log(fabrics)

    } catch (error) {
      console.error('Error fetching fabrics:', error);
    }
  }

  const getAllFabricsPages = async (page = 0) => {
    try {
      const res = await fetch(`http://localhost:8080/fabrics/page/${page}/3`);
      const json = await res.json();

      const fabricsWithImageURL = json.content.map((fabric) => {

        const imageBase64 = fabric.img;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        if (fabric.img) {
          return {
            ...fabric,
            img: imageUrl,
          };
        }
        return {
          ...fabric,
          img: null,
        };
      });

      dispatch({
        type: 'GET_ALL_FABRICS',
        payload: fabricsWithImageURL,
      });

      setPaginator(json)
      console.log(json)
    } catch (error) {
      console.error('Error fetching fabrics:', error);
    }
  }


  const addNewFabric = async (fabricForm) => {
    let imageFile = new FormData();
    let imgIsPresent = false;

    if (fabricForm.img) {
      imageFile.append(`imageFile`, fabricForm.img)
      fabricForm.img = "";
      imgIsPresent = true;
    }
    try {
      const response = await fetch("http://localhost:8080/fabrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fabricForm)
      })
      if (response.ok) {
        let json = await response.json();


        const addImg = async () => {
          const imgResponse = await fetch(`http://localhost:8080/fabrics/addimg/${json.id}`, {
            method: 'PUT',
            body: imageFile,
          })
          if (imgResponse.ok) {
            let imgJson = await imgResponse.json();

            const fabricWithImageURL = () => {
              const imageBase64 = imgJson.img; // Suponiendo que 'img' contiene los datos binarios de la imagen
              const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
              if (imgJson.img) {
                return {
                  ...imgJson,
                  img: imageUrl
                }
              }
              return json;
            }
            dispatch({
              type: 'ADD_FABRIC',
              payload: fabricWithImageURL()
            })
          }
        }
        if (imgIsPresent) {
          addImg();
        } else {
          dispatch({
            type: 'ADD_FABRIC',
            payload: json
          })
        }

        setFabricWasAdded(true)
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
    let imgIsPresent = false;
    let imageFile = new FormData();
    if (fabricForm.img) {
      try {
        if (fabricForm.img.split(",")[0] === "data:image/jpeg;base64") {
          return
        }
      } catch (error) {
      }
      imageFile.append(`imageFile`, fabricForm.img)
      imgIsPresent = true;
      fabricForm.img = "";
    }
    try {
      // console.log("Entrando al try");
      const response = await fetch(`http://localhost:8080/fabrics/${fabricForm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fabricForm)
      });
      if (response.ok) {
        const json = await response.json();

        const addImg = async () => {
          const imgResponse = await fetch(`http://localhost:8080/fabrics/addimg/${json.id}`, {
            method: 'PUT',
            body: imageFile,
          })
          if (imgResponse.ok) {
            let imgJson = await imgResponse.json();

            const fabricWithImageURL = () => {
              const imageBase64 = imgJson.img; // Suponiendo que 'img' contiene los datos binarios de la imagen
              const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
              if (imgJson.img) {
                return {
                  ...imgJson,
                  img: imageUrl
                }
              }
              return json;
            }
            dispatch({
              type: 'EDIT_FABRIC',
              payload: fabricWithImageURL()
            })
          }
        }

        if (imgIsPresent) {
          addImg();
        } else {
          dispatch({
            type: "EDIT_FABRIC",
            payload: fabricForm
          })
        }

        setFabricWasEdited(true);
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
            const response = await fetch(`http://localhost:8080/fabrics/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
            })
            if (response.ok) {
              // const json = await response.json();
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

  const searchFabricByString = async (fabric) => {
    const getFabricsFound = await fetch(`http://localhost:8080/fabrics/searchByString/${fabric}`);
    if (getFabricsFound.ok) {
      const fabricFoundJson = await getFabricsFound.json();
      // setFabricPage(fabricFoundJson);
      const fabricsWithImg = fabricFoundJson.map(fabric => {
        const imageBase64 = fabric.img;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        if (fabric.img) {
          return {
            ...fabric,
            img: imageUrl
          };
        };
        return {
          ...fabric,
          img: null
        };
      });
      dispatch({
        type: 'GET_ALL_FABRICS',
        payload: fabricsWithImg,
      });
    };
  };

  return {
    fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    paginator,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabrics,
    getAllFabricsPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString,
  }
}