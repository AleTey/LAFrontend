import { useContext, useEffect, useState } from "react"
import { AmountPerSizeTable } from "./AmountPerSizeTable"
import { InputQuantityTable } from "./InputQuantityTable";
import { ImageModal } from "./imageModal";
import { hasAnyRole, hasAnyRoleV2 } from "../auth/utils/hasAnyRole";
import { usePreparationSpreadsheet } from "../hooks/lotes/usePreparationSpreadsheet";
import { AuthContext } from "../auth/context/AuthContext.Jsx";

export const PreparationSpreadSheet = ({ preparationSpreadSheet, setPreparationSpreadSheet, setPreparationSpreadSheetIsOpen }) => {

  const { updatePreparationSpreadSheet, updateImagePreparationSpreadSheet, inputsCalculator } = usePreparationSpreadsheet();

  const [preparationSpreadSheetForm, setPreparationSpreadSheetForm] = useState(preparationSpreadSheet);

  const [newImg, setNewImg] = useState("");

  const [inputQuantityForSpreadSheetList, setInputQuantityForSpreadSheetList] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);

  const { login } = useContext(AuthContext);


  useEffect(() => {
    setPreparationSpreadSheetForm(preparationSpreadSheet)
  }, [preparationSpreadSheet])

  const onGetQuantityForInputs = () => {
    inputsCalculator(preparationSpreadSheetForm.id, setInputQuantityForSpreadSheetList);
  }

  const onSheetChange = (e, amountId) => {
    const { name, value } = e.target;

    setInputQuantityForSpreadSheetList([])

    setPreparationSpreadSheetForm({
      ...preparationSpreadSheetForm,
      amountPerSizeForProductDTOs:
        preparationSpreadSheetForm.amountPerSizeForProductDTOs.map(amount => {
          if (amount.id !== amountId) {
            return amount;
          }
          return {
            ...amount,
            amountPerSize: {
              ...amount.amountPerSize,
              [name]: value
            }
          }
        })
    })
  }

  const onChangeDetails = (e) => {
    const { name, value } = e.target;
    setPreparationSpreadSheetForm({
      ...preparationSpreadSheetForm,
      [name]: value
    })
  }

  const onChangeImgFile = (e) => {
    const file = e.target.files[0];
    setPreparationSpreadSheetForm({
      ...preparationSpreadSheetForm,
      img: file
    })
    setNewImg(file);
  }


  const onCancelarCambios = () => {
    setPreparationSpreadSheetForm(preparationSpreadSheet);
    setEditMode(false);
  }

  const preparationSpreadSheetToSendMapper = (preparationSheet) => {
    return {
      id: preparationSheet.id,
      amountPerSizeForProducts: preparationSheet.amountPerSizeForProductDTOs.map(amount => {
        return {
          ...amount,
          product: {
            id: amount.productForLoteDTO.id
          }
        }
      }),
      details: preparationSheet.details,
    }
  }

  const onSubmit = () => {
    updatePreparationSpreadSheet(preparationSpreadSheetToSendMapper(preparationSpreadSheetForm), preparationSpreadSheetForm, setPreparationSpreadSheet, setEditMode);

    if (typeof preparationSpreadSheet.img != "string") {
      updateImagePreparationSpreadSheet(preparationSpreadSheetForm.id, newImg, preparationSpreadSheetForm, setPreparationSpreadSheet);
    }
  }

  return (
    <>
      {imageModalIsOpen &&
        <ImageModal
          image={preparationSpreadSheetForm.img}
          title="titulo"
          modalIsOpen={setImageModalIsOpen}
        />
      }
      <div className="container d-flex row gap-3">
        <div className="d-flex column d-flex justify-content-between">
          {/* <div className="d-flex justify-content-center"> */}
          <h2 className="modal-title" id="staticBackdropLabel">Planilla preparación</h2>
          {/* </div> */}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setPreparationSpreadSheetIsOpen(false)} ></button>
        </div>
        <hr />
        <div className="container d-flex row gap-3 justify-content-center">

          {
            preparationSpreadSheetForm && preparationSpreadSheetForm.amountPerSizeForProductDTOs &&
            preparationSpreadSheetForm.amountPerSizeForProductDTOs.map(amount => (

              <AmountPerSizeTable
                key={amount.id}
                amount={amount}
                editMode={editMode}
                onSheetChange={onSheetChange}
              />

              // <></>
            ))
          }
        </div>

        {
          !editMode && hasAnyRole(login.user.authorities, ["UPDATE_PREPARATION_SPREADSHEET"]) &&
          <div className="container d-flex justify-content-center">
            <button
              className="btn btn-success m-4"
              onClick={onGetQuantityForInputs}
            >
              Calcular cantidad insumos
            </button>
          </div>
        }

        {
          inputQuantityForSpreadSheetList.length > 0 &&
          <div className="container">
            <h6>Cantidad de insumos</h6>
            <InputQuantityTable
              inputQuantityForSpreadsheet={inputQuantityForSpreadSheetList}
            />
          </div>
        }
        <hr />
        <h5>Detalles</h5>
        {
          !editMode ?
            <div className="border">
              <p>{preparationSpreadSheetForm.details}</p>
            </div>
            :
            <textarea name="details" id="" className="form-control" value={preparationSpreadSheetForm.details || ""} onChange={onChangeDetails}></textarea>
        }

        <hr />

        <h5>Imagen de insumos enviados/ a enviar</h5>

        {/* <div className="container"> */}
        <div onClick={() => { setImageModalIsOpen(true) }} style={{ maxWidth: "12rem" }}>
          <img src={preparationSpreadSheetForm.img || 'src/db/imgs/image-not-found.jpg'} style={{ maxWidth: "10rem" }} alt="" />
        </div>

        {/* </div> */}


        {
          editMode &&
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label h6 mt-3">Seleccionar imagen</label>
            <input
              className="form-control mt-1"
              type="file"
              id="formFile"
              name="img"
              // value={fabricForm.img}
              onChange={onChangeImgFile}
            />
          </div>
        }

        {
          hasAnyRole(login.user.authorities, ["UPDATE_PREPARATION_SPREADSHEET"]) &&
          <div className="container mt-4 mb-3 d-flex row gap-3">
            {
              !editMode ?
                <button
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Editar planilla
                </button>
                :
                <button
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Guardar Cambios
                </button>
            }

            {
              editMode &&
              <button
                className="btn btn-danger"
                onClick={onCancelarCambios}
              > Cancelar cambios
              </button>
            }
          </div>
        }


      </div>


    </>
  )
}