import { useEffect, useState } from "react"
import { CorrederaForm } from "./CorrederaForm";
import { useSuppliers } from "../hooks/useSuppliers";
import { useCorredera } from "../hooks/inputs/useCorredera";
import { useInputModal } from "../hooks/inputs/useInputModal";
import { ElasticoForm } from "./ElasticoForm";

export const NewInputModal = ({
  selection = "",
  inputToEdit,
  addNewCorredera,
  updateCorredera,
  editCorrederaFormHandled
}) => {


  const [elasticoFormIsActive, setElasticoFormIsActive] = useState(false);

  const [selectedForm, setSelectedForm] = useState(selection);

  const { correderaFormIsActive, setCorrederaFormIsActive } = useCorredera();

  const { inputModalIsOpen, toggle, selectedModal, modalSelectionHandler } = useInputModal();


  const {
    suppliers,
    getSuppliers
  } = useSuppliers();

  const handleCorrederaButton = () => {
    if (!correderaFormIsActive) {
      setElasticoFormIsActive(false);
      setCorrederaFormIsActive(true);
    }

    setSelectedForm("corredera")
  }

  const handleElasticoButton = () => {
    if (!elasticoFormIsActive) {
      setCorrederaFormIsActive(false);
      setElasticoFormIsActive(true);
    }
    setSelectedForm("elastico")
  }


  useEffect(() => {
    getSuppliers();
  }, [])



  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <h1 className="modal-title fs-5" id="staticBackdropLabel">{`${inputToEdit ? `Editar ${selection}` : `Nuevo insumo (${selectedForm})`}`}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                toggle();
                modalSelectionHandler("");
                editCorrederaFormHandled && editCorrederaFormHandled();
              }}></button>
            </div>
            <div className="modal-body">

              {
                !inputToEdit &&

                <div className="container mb-3">

                  <button
                    className={`btn ${!correderaFormIsActive ? "btn-outline-primary" : "btn-primary"} me-1`}
                    onClick={handleCorrederaButton}
                  >
                    Corredera
                  </button>

                  <button
                    className={`btn ${!elasticoFormIsActive ? "btn-outline-primary" : "btn-primary"}`}
                    onClick={handleElasticoButton}
                  >
                    Elastico
                  </button>


                </div>
              }

              {
                correderaFormIsActive &&
                <CorrederaForm
                  suppliers={suppliers}
                  addNewCorredera={addNewCorredera}
                  updateCorredera={updateCorredera}
                />
              }


              {
                selectedModal === "editCorredera" &&

                <CorrederaForm
                  suppliers={suppliers}
                  correderaFormData={inputToEdit}
                  addNewCorredera={addNewCorredera}
                  updateCorredera={updateCorredera}
                />
              }

              {
                selectedForm=== "elastico" &&
                <ElasticoForm
                suppliers={suppliers}
                />
              }



            </div>

            {/* <div className="modal-footer"> */}
            {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
            {/* <button type="button" className="btn btn-primary" onClick={onSubmit}>Guardar</button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}