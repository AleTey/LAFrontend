import { useState } from "react"
import { useParams } from "react-router-dom";
import { Searcher } from "./Searcher";

export const FabricSelector = ({ closeModal, onChangeFabric, fabricSelected, setFabricSelected, onChangeFabricForTira }) => {

  const [fabricPage, setFabricPage] = useState({});

  // const [fabricPageContent, setFabricPageContent] = useState([]);

  const [fabricsFound, setFabricFound] = useState([])

  // const [paginator, setPaginator] = useState({});

  const [fabricToSearch, setFabricToSearch] = useState("");

  const { page } = useParams();

  // const { searchFabricByString } = useFabric();

  // const {login} = useContext(AuthContext);



  // useEffect(() => {
  //   const getFabricPage = async () => {
  //     const getFabricPage = await fetch("http://localhost:8080/fabrics/page/1/2");
  //     if (getFabricPage.ok) {
  //       const fabricPageJson = await getFabricPage.json();
  //       setFabricPage(fabricPageJson);
  //       const fabricsWithImg = fabricPageJson.content.map(fabric => {
  //         const imageBase64 = fabric.img;
  //         const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
  //         if (fabric.img) {
  //           return {
  //             ...fabric,
  //             img: imageUrl
  //           };
  //         };
  //         return {
  //           ...fabric,
  //           img: null
  //         };
  //       });
  //       setFabricPageContent(fabricsWithImg);
  //     };
  //   };
  //   getFabricPage();
  // }, [])

  const onClickSelect = (e, fabric) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(fabric);
    setFabricSelected(fabric);
  }

  // const searchFabric = (string, p) => {
  //   searchFabricByString(string, p, setFabricFound)
  // }

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
                  pageNumber={page}
                  setStringToSearch={setFabricToSearch}
                />

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
                                <th><img src={fabric.img || fabric.urlFile} alt="" style={{ maxWidth: '4rem' }} className="img-thumbnail" /></th>
                              </a>
                              :
                              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '30%' }} className="img-fluid img-fluid" /></th>

                          }
                          <th className="align-middle">{fabric.nombre}</th>
                          <th className="align-middle">
                            {
                              fabricSelected && fabric.id !== fabricSelected.id ?
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  value={fabric}
                                  onClick={(e) => { onClickSelect(e, fabric), onChangeFabric(fabric.id), closeModal(false) }}
                                // , onChangeFabricForTira(e, fabric)
                                >
                                  Seleccionar
                                </button>
                                :
                                <button
                                  className="btn btn-secondary btn-sm"
                                  disabled
                                >
                                  Seleccionado
                                </button>
                            }

                          </th>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
              {/* <Paginator
                paginator={fabricPage}
                path='fabric/fabric-selector'
              /> */}
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}