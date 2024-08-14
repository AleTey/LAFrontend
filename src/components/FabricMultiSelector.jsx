import { useCallback, useContext, useEffect, useState } from "react"
import { Seeker } from "./Seeker";
import { useFabric } from "../hooks/useFabric";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { Searcher } from "./Searcher";

export const FabricMultiSelector = ({ closeModal, onChangeFabric, fabricsSelected, setFabricsSelected, ancho, telasSeleccionadas, onCancelFabric }) => {

  const [fabricPage, setFabricPage] = useState({});

  const [fabricPageContent, setFabricPageContent] = useState([]);

  const [fabricsFound, setFabricFound] = useState([]);

  const [stringToSearch, setStringToSearch] = useState("");

  const { getAllFabricsPages } = useFabric()

  const { handlerLogout } = useContext(AuthContext);



  useEffect(() => {
    const getFabricPage = async () => {
      const getFabricPage = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/page/1/2`, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      });
      if (getFabricPage.ok) {
        const fabricPageJson = await getFabricPage.json();
        setFabricPage(fabricPageJson);
        const fabricsWithImg = fabricPageJson.content.map(fabric => {
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
        setFabricPageContent(fabricsWithImg);
      };
    };
    getFabricPage();
  }, [])

  const searchFabric = async (fabric) => {
    console.log("entrando searchFabric")
    console.log(fabric);
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/fabrics/searchByString`);
    url.searchParams.append('string', fabric);
    url.searchParams.append('page', 0);
    url.searchParams.append('size', 15);
    const getFabricsFound = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (getFabricsFound.ok) {
      const fabricFoundJson = await getFabricsFound.json();
      console.log(fabricFoundJson)
      setFabricPage(fabricFoundJson);
      const fabricsWithImg = fabricFoundJson.content.map(fabric => {
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
      setFabricFound(fabricsWithImg);
    };
  };

  const onClickAgregar = (e, fabric) => {
    e.preventDefault();
    const { value } = e.target;
    setFabricsSelected([
      ...fabricsSelected,
      fabric
    ]);
  }

  // const onCancelFabric = (e, fabricId) => {
  //   setFabricsSelected(
  //     fabricsSelected.filter(fabric => fabric.id !== fabricId)
  //   )
  // }
  // const searchFabric = async (string, page = 0) => {
  //   const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/fabrics/searchByString`);
  //   url.searchParams.append('string', string);
  //   url.searchParams.append('page', page);
  //   url.searchParams.append('size', 15);
  //   const res = await fetch(url.toString(), {
  //     headers: {
  //       "Authorization": sessionStorage.getItem("token")
  //     }
  //   });
  //   if (res.ok) {
  //     const json = await res.json();
  //     const fabricsWithImageURL = json.content.map((fabric) => {

  //       const imageBase64 = fabric.img;
  //       const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
  //       if (fabric.img) {
  //         return {
  //           ...fabric,
  //           img: imageUrl,
  //         };
  //       }
  //       return {
  //         ...fabric,
  //         img: null,
  //       };
  //     });

  //     dispatch({
  //       type: 'GET_ALL_FABRICS',
  //       payload: fabricsWithImageURL,
  //     });

  //     console.log(json)
  //   } else {
  //     const error = await res.json();
  //     if (error.message === "Please Login") {
  //       handlerLogout();
  //     }
  //   }
  // };

  // const searchFabric = async (fabric) => {

  //   const getFabricsFound = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fabrics/searchByString/${fabric}`, {
  //     headers: {
  //       "Authorization": sessionStorage.getItem("token")
  //     }
  //   });
  //   if (getFabricsFound.ok) {
  //     const fabricFoundJson = await getFabricsFound.json();
  //     setFabricPage(fabricFoundJson);
  //     const fabricsWithImg = fabricFoundJson.map(fabric => {
  //       const imageBase64 = fabric.img;
  //       const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
  //       if (fabric.img) {
  //         return {
  //           ...fabric,
  //           img: imageUrl
  //         };
  //       };
  //       return {
  //         ...fabric,
  //         img: null
  //       };
  //     });
  //     setFabricFound(fabricsWithImg);
  //   };
  // };



  return (
    <>
      <div className="modal fade show sm-0" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog sm-0">
          <div className="modal-content sm-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Seleccionador tela</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}></button>
            </div>
            <div className="modal-body sm-0">

              <div className="container sm-0">

                <Searcher
                  onClickSearch={searchFabric}
                  pageNumber={0}
                  setStringToSearch={setStringToSearch}
                />

                {/* <Seeker
                  onClickSearch={searchFabric}
                /> */}

                <table className="table table-striped">

                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Img</th>
                      <th>Nombre</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      fabricsFound &&
                      fabricsFound.map(fabric => (
                        <tr key={fabric.id}>
                          <th className="align-middle">{fabric.id}</th>
                          {
                            fabric.img || fabric.urlFile ?
                              <a href={fabric.urlFile} target="_blank">
                                <th><img src={fabric.img || fabric.urlFile} alt="" style={{ maxWidth: '5rem' }} className="img-thumbnail" /></th>
                              </a>
                              :
                              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '30%' }} className="img-fluid img-fluid" /></th>

                          }

                          <th className="align-middle">{fabric.nombre}</th>
                          <th className="align-middle">
                            {
                              telasSeleccionadas.some(detalle => detalle.width == ancho && detalle.fabric.id === fabric.id) ?
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={(e) => onCancelFabric(e, ancho, fabric.id)}
                                >
                                  Cancelar
                                </button>
                                :
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  value={fabric}
                                  onClick={(e) => {
                                    onChangeFabric(e, fabric, ancho)
                                  }}
                                >
                                  Agregar
                                </button>
                            }

                          </th>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}