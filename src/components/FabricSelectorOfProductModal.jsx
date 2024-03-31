import { useEffect, useState } from "react"

export const FabricSelectorOfProductModal = ({ closeModal }) => {

  const [fabricPage, setFabricPage] = useState({});

  const [fabricPageContent, setFabricPageContent] = useState([]);

  const [fabricSelected, setFabricSelected] = useState({});

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

  const onChangeFabricSelected = (e) => {

  }


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
                      fabricPageContent &&
                      fabricPageContent.map(fabric => (
                        <tr key={fabric.id}>
                          <th className="align-middle">{fabric.id}</th>
                          {
                            fabric.img ?
                              <th><img src={fabric.img} alt="" style={{ maxWidth: '4rem' }} className="img-thumbnail" /></th>
                              :
                              <th><img src="src/db/imgs/image-not-found.jpg" alt="" style={{ maxWidth: '30%' }} className="img-fluid img-fluid" /></th>

                          }
                          <th className="align-middle">{fabric.nombre}</th>
                          <th className="align-middle"><button className="btn btn-outline-primary btn-sm">Seleccionar</button></th>
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