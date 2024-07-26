import { useEffect, useState } from "react"
import { Seeker } from "./Seeker";

export const ModelSelectorOfProductModal = ({ closeModal, onChangeModel, modelSelected, setModelSelected }) => {

  const [fabricPage, setFabricPage] = useState({});

  const [models, setModels] = useState([])



  const onClickSelect = (e, model) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(model);
    setModelSelected(model);
  }

  const searchModel = async (model) => {

    const getFoundedModels = await fetch(`${import.meta.env.VITE_API_BASE_URL}/models/searchByString/${model}`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (getFoundedModels.ok) {
      const fondedModelJson = await getFoundedModels.json();
      setModels(fondedModelJson);
    } else {
      const error = await getFoundedModels.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
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
                  onClickSearch={searchModel}
                />

                <table className="table table-striped">

                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      models &&
                      models.map(model => (
                        <tr key={model.id}>
                          <th className="align-middle">{model.id}</th>
                          <th className="align-middle">{model.nombre}</th>
                          <th className="align-middle">{model.tipoPrenda}</th>
                          <th className="align-middle">
                            {
                              modelSelected && model.id !== modelSelected.id ?
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  value={model}
                                  onClick={(e) => { onClickSelect(e, model), onChangeModel(model) }}
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
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}