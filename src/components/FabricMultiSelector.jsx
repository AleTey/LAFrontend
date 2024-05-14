import { useEffect, useState } from "react"
import { Seeker } from "./Seeker";

export const FabricMultiSelector = ({ closeModal, onChangeFabric, fabricsSelected, setFabricsSelected, ancho, telasSeleccionadas, onCancelFabric }) => {

  const [fabricPage, setFabricPage] = useState({});

  const [fabricPageContent, setFabricPageContent] = useState([]);

  const [fabricsFound, setFabricFound] = useState([])



  useEffect(() => {
    const getFabricPage = async () => {
      const getFabricPage = await fetch("http://localhost:8080/fabrics/page/1/2");
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

  // const onClickAgregar = (e, fabric) => {
  //   e.preventDefault();
  //   const { value } = e.target;
  //   setFabricsSelected([
  //     ...fabricsSelected,
  //     fabric
  //   ]);
  // }

  // const onCancelFabric = (e, fabricId) => {
  //   setFabricsSelected(
  //     fabricsSelected.filter(fabric => fabric.id !== fabricId)
  //   )
  // }

  const searchFabric = async (fabric) => {

    const getFabricsFound = await fetch(`http://localhost:8080/fabrics/searchByString/${fabric}`);
    if (getFabricsFound.ok) {
      const fabricFoundJson = await getFabricsFound.json();
      setFabricPage(fabricFoundJson);
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

                <Seeker
                  onClickSearch={searchFabric}
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
                            fabric.img ?
                              <th><img src={fabric.img} alt="" style={{ maxWidth: '4rem' }} className="img-thumbnail" /></th>
                              :
                              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '30%' }} className="img-fluid img-fluid" /></th>

                          }
                          <th className="align-middle">{fabric.nombre}</th>
                          <th className="align-middle">
                            {
                              telasSeleccionadas.some(detalle => detalle.width == ancho && detalle.fabric.id === fabric.id) ?
                                // fabricsSelected && fabric.id !== fabricsSelected.id ?
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
                                    // onClickAgregar(e, fabric),
                                    //  onAddFabric(fabric.id), 
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