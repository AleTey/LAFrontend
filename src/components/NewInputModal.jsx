import { useContext, useEffect, useState } from "react"
import { CorrederaForm } from "./CorrederaForm";
import { useSuppliers } from "../hooks/useSuppliers";
import { useCorredera } from "../hooks/inputs/useCorredera";
import { useInputModal } from "../hooks/inputs/useInputModal";
import { ElasticoForm } from "./ElasticoForm";
import { ArgollaForm } from "./ArgollaForm";
import { GanchoForm } from "./GanchoForm";
import { EtiquetaForm } from "./EtiquetaForm";
import { ApliqueForm } from "./ApliqueForm";
import { AuthContext } from "../auth/context/AuthContext.Jsx";

export const NewInputModal = ({
  selection = "",
  inputToEdit,
  addNewCorredera,
  updateCorredera,
  formIsOpen }) => {

  const { toggle, selectedModal, modalSelectionHandler } = useInputModal();

  const [simplestSuppliers, setSimplestSuppliers] = useState([]);

  const {login} = useContext(AuthContext);


  const {
    suppliers,
    getSimplestSuppliers
  } = useSuppliers();


  const buttonSelectionHandler = (e) => {
    modalSelectionHandler(e.target.value);
  }


  useEffect(() => {
    if (simplestSuppliers.length === 0) {
      getSimplestSuppliers(setSimplestSuppliers);
    }
  }, [])



  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <h1 className="modal-title fs-5" id="staticBackdropLabel">{`${inputToEdit ? `Editar ${selection}` : `Nuevo insumo (${selectedModal})`}`}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  toggle();
                  modalSelectionHandler("");
                  if (formIsOpen) {
                    formIsOpen(false);
                  }
                }}></button>
            </div>
            <div className="modal-body">

              {
                !inputToEdit &&

                <div className="container mb-3">

                  <button
                    value="corredera"
                    className={`btn ${selectedModal === "corredera" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={buttonSelectionHandler}
                  >
                    Corredera
                  </button>

                  <button
                    value="elastico"
                    className={`btn ${selectedModal === "elastico" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={buttonSelectionHandler}
                  >
                    Elastico
                  </button>
                  <button
                    value='argolla'
                    className={`btn ${selectedModal === "argolla" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={buttonSelectionHandler}
                  >
                    Argollas
                  </button>
                  <button
                    value='gancho'
                    className={`btn ${selectedModal === "gancho" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={buttonSelectionHandler}
                  >
                    Gancho
                  </button>
                  <button
                    value='etiqueta'
                    className={`btn ${selectedModal === "etiqueta" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={buttonSelectionHandler}
                  >
                    Etiqueta
                  </button>
                  <button
                    value='aplique'
                    className={`btn ${selectedModal === "aplique" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={buttonSelectionHandler}
                  >
                    Aplique
                  </button>
                </div>
              }

              {
                selectedModal === "corredera" &&
                <CorrederaForm
                  suppliers={simplestSuppliers}
                  addNewCorredera={addNewCorredera}
                  updateCorredera={updateCorredera}
                />
              }

              {
                selectedModal === "editCorredera" &&

                <CorrederaForm
                  suppliers={simplestSuppliers}
                  correderaFormData={inputToEdit}
                  addNewCorredera={addNewCorredera}
                  updateCorredera={updateCorredera}
                  formIsOpen={formIsOpen}
                />
              }

              {
                selectedModal === "elastico" &&
                <ElasticoForm
                  suppliers={simplestSuppliers}
                />
              }

              {
                selectedModal === "editElastico" &&
                <ElasticoForm
                  suppliers={simplestSuppliers}
                  elasticoFormData={inputToEdit}
                  formIsOpen={formIsOpen}
                />
              }

              {
                selectedModal === "argolla" &&
                <ArgollaForm
                  suppliers={simplestSuppliers}
                />
              }

              {
                selectedModal === "editArgolla" &&
                <ArgollaForm
                  suppliers={simplestSuppliers}
                  argollaFormData={inputToEdit}
                  formIsOpen={formIsOpen}
                />
              }

              {
                selectedModal === "gancho" &&
                <GanchoForm
                  suppliers={simplestSuppliers}
                />
              }
              {
                selectedModal === "editGancho" &&
                <GanchoForm
                  suppliers={simplestSuppliers}
                  ganchoFormData={inputToEdit}
                  formIsOpen={formIsOpen}
                />
              }
              {
                selectedModal === "etiqueta" &&
                <EtiquetaForm
                  suppliers={simplestSuppliers}
                />
              }
              {
                selectedModal === "editEtiqueta" &&
                <EtiquetaForm
                  suppliers={simplestSuppliers}
                  etiquetaFormData={inputToEdit}
                  formIsOpen={formIsOpen}
                />
              }

              {
                selectedModal === "aplique" &&
                <ApliqueForm
                  suppliers={simplestSuppliers}
                />
              }
              {
                selectedModal === "editAplique" &&
                <ApliqueForm
                  suppliers={simplestSuppliers}
                  apliqueFormData={inputToEdit}
                  formIsOpen={formIsOpen}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}