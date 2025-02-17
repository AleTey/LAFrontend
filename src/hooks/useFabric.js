import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { fabricReducer } from "../reducers/fabricReducer";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { FabricContext } from "../context/FabricContext";


export const useFabric = () => {

  const [supplies, setSupplies] = useState([]);

  // const { setPaginator } = useContext(FabricContext);

  const [fabricModalIsOpen, setFabricModalIsOpen] = useState(false);

  const [fabricWasAdded, setFabricWasAdded] = useState(false);
  const [fabricWasEdited, setFabricWasEdited] = useState(false);
  const [fabricWasDeleted, setFabricWasDeleted] = useState(false);
  const [fabricErrorFetch, setFabricErrorFetch] = useState("");

  // const [fabricWUrlImage, setFabricWUrlImage] = useState({});

  const [fabrics, dispatch] = useReducer(fabricReducer, []);

  const [fabricIsLoading, setFabricIsLoading] = useState(false);

  // const { fabricIsLoading,
  //   setFabricIsLoading } = FabricContext;

  // const [paginator, setPaginator] = useState({});
  // const [usePaginator, setUsePaginator] = useState({});

  const onNewFabric = () => {
    setFabricModalIsOpen(true);
  }

  const { handlerLogout } = useContext(AuthContext);


  const getAllFabricsPages = async (page = 0, setPaginator) => {
    setFabricIsLoading(true);
    try {
      console.log("function")
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/page/${page}/8`, {
        headers: {
          "Authorization": sessionStorage.getItem('token')
        }
      });
      // const res = await fetch(`http://localhost:8080/fabrics/page/${page}/3`);

      if (res.ok) {
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
        setFabricIsLoading(false)
        setPaginator(json)
        console.log(json)
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }


    } catch (error) {
      console.error('Error fetching fabrics:', error);
    }
  }
  const getAllFabricsDtoPages = async (page = 0, setPaginator) => {
    try {
      console.log("function")
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/page-dto/${page}/3`, {
        headers: {
          "Authorization": sessionStorage.getItem('token')
        }
      });
      // const res = await fetch(`http://localhost:8080/fabrics/page/${page}/3`);

      if (res.ok) {
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
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }


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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics`, {
        method: "POST",
        headers: {
          "Authorization": sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fabricForm)
      })
      if (response.ok) {
        let json = await response.json();


        const addImg = async () => {
          const imgResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/addimg/${json.id}`, {
            method: 'PUT',
            headers: {
              "Authorization": sessionStorage.getItem("token")
            },
            body: imageFile,
          })
          if (imgResponse.ok) {
            let imgJson = await imgResponse.json();
            console.log(imgJson);
            const fabricWithImageURL = () => {
              const imageBase64 = imgJson.img; // Suponiendo que 'img' contiene los datos binarios de la imagen
              const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
              if (imgJson.img) {
                return {
                  ...imgJson,
                  img: imageUrl,
                  urlFile: imgJson.urlFile
                }
              } else {
                return {
                  ...imgJson,
                  urlFile: imgJson.urlFile
                }
              }

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

      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
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
    console.log("ENTRANDO EN EDITFABRIC")
    let imgIsPresent = false;
    let imageFile = new FormData();
    setFabricIsLoading(true);
    if (fabricForm.img) {
      // if (fabricForm.img.split(",")[0] !== "data:image/jpeg;base64") {
      if (typeof fabricForm.img !== 'string') {
        imageFile.append(`imageFile`, fabricForm.img)
        imgIsPresent = true;
        fabricForm.img = "";
      }
    }
    try {
      console.log("FIRST TRY")
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/${fabricForm.id}`, {
        method: "PUT",
        headers: {
          "Authorization": sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...fabricForm, img: null })
      });
      console.log(response)
      if (response.ok) {
        const json = await response.json();
        console.log("edited")
        const addImg = async () => {
          const imgResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/addimg/${json.id}`, {
            method: 'PUT',
            headers: {
              "Authorization": sessionStorage.getItem("token")
            },
            body: imageFile,
          })
          if (imgResponse.ok && imgIsPresent) {
            let imgJson = await imgResponse.json();

            const fabricWithImageURL = () => {
              // const imageBase64 = imgJson.img; // Suponiendo que 'img' contiene los datos binarios de la imagen
              // const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
              if (imgJson.urlFile) {
                return {
                  ...imgJson,
                  urlFile: imgJson.urlFile
                }
              }
              return json;
            }
            dispatch({
              type: 'EDIT_FABRIC',
              payload: fabricWithImageURL()
            })
          } else {
            const error = await res.json();
            if (error.message === "Please Login") {
              handlerLogout();
            }
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
        setFabricIsLoading(false);
        setFabricWasEdited(true);
        setTimeout(() => {
          setFabricWasEdited(false);
        }, 8000)
      } else {
        setFabricIsLoading(false);
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
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
          setFabricIsLoading(true)
          try {
            // const response = await fetch(`http://localhost:3000/colors/${id}`, {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/${id}`, {
              method: "DELETE",
              headers: {
                "Authorization": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
              },
            })
            if (response.ok) {
              dispatch({
                type: "REMOVE_FABRIC",
                payload: id
              });
              setFabricIsLoading(false);
              setFabricWasDeleted(true);
              setTimeout(() => {
                setFabricWasDeleted(false);
              }, 8000)
            } else {
              setFabricIsLoading(false);
              const error = await res.json();
              if (error.message === "Please Login") {
                handlerLogout();
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
        deleteFabric();
      }
    })
  }

  const searchFabricByString = async (string, page = 0, setPaginator) => {
    setFabricIsLoading(true);
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/fabrics/searchByString`);
    url.searchParams.append('string', string);
    url.searchParams.append('page', page);
    url.searchParams.append('size', 4);
    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (res.ok) {
      const json = await res.json();
      console.log(json)
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
      setFabricIsLoading(false);
      setPaginator(json)
      console.log(json)
    } else {
      setFabricIsLoading(false);
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  };
  const searchFabricDtoByString = async (string, page = 0, setPaginator) => {
    // console.log("searchFabricDtoByString");
    setFabricIsLoading(true)
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/fabrics/search-dto-ByString`);
    url.searchParams.append('string', string);
    url.searchParams.append('page', page);
    url.searchParams.append('size', 4);
    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (res.ok) {
      const json = await res.json();
      console.log(json)
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
      setFabricIsLoading(false);
      setPaginator(json)
      console.log(json)
    } else {
      setFabricIsLoading(false);
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  };

  const findSeasons = async (setSeasons) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/seasons`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const resJson = await res.json();
      setSeasons(resJson);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const findFabricsBySeason = async (season, setSeasonFabrics) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/by-season/${season}`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson)
      setSeasonFabrics(fabricImgMapper(resJson));
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const fabricImgMapper = (fabrics) => {

    return fabrics.map(fabric => {
      return {
        ...fabric,
        img: `data:image/jpeg;base64,${fabric.img}`
      }
    })

  }

  return {
    fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    // usePaginator,
    // setUsePaginator,
    // paginator,
    // setPaginator,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabricsPages,
    getAllFabricsDtoPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString,
    searchFabricDtoByString,
    findSeasons,
    findFabricsBySeason,
    fabricIsLoading,
    setFabricIsLoading
  }
}