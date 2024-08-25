import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { useCutSpreadsheet } from "../hooks/lotes/useCutSpreadsheet";
import { hasAnyRole } from "../auth/utils/hasAnyRole";
import { errorAlert } from "./alerts/errorAlert";

const cutSpreadSheetValidator = (sheet) => {
  let errors = {};
  sheet.amountPerSizeForProductDTO.forEach(a => (
    Object.values(a.amountPerSize).forEach(value => {
      console.log(value)
      if (value < 0 || value === "" || value === null || value === undefined) {
        errors.invalidAmount = "Todos los valores deben ser igual o mayores que cero"
      }
    })
  ));

  return errors;

}


export const CutSpreadSheet = ({ cutSpreadSheet, setCutSpreadSheet, setCutSpreadSheetIsOpen }) => {

  const [cutSpreadSheetForm, setCutSpreadSheetForm] = useState(cutSpreadSheet);

  const [editMode, setEditMode] = useState(false);

  const [errors, setErrors] = useState({});

  const { login } = useContext(AuthContext);


  const { updateCutSpreadSheet } = useCutSpreadsheet();


  useEffect(() => {
    setCutSpreadSheetForm(cutSpreadSheet)
  }, [cutSpreadSheet])

  const onCancelarCambios = () => {
    setCutSpreadSheetForm(cutSpreadSheet);
    setEditMode(false);
  }

  const onSheetChange = (e, id) => {
    const { name, value } = e.target;

    setCutSpreadSheetForm({
      ...cutSpreadSheetForm,
      amountPerSizeForProductDTO:
        cutSpreadSheetForm.amountPerSizeForProductDTO.map(a => {
          if (id !== a.id) {
            return a
          }
          return {
            ...a,
            amountPerSize: {
              ...a.amountPerSize,
              [name]: value
            }

          }
        })
    })
  }

  const onChangeNumberOfLayers = (e, id) => {
    const { name, value } = e.target;

    console.log(name)
    console.log(value)

    setCutSpreadSheetForm({
      ...cutSpreadSheetForm,
      fabricLengthDetailsDTOs:
        cutSpreadSheetForm.fabricLengthDetailsDTOs.map(fDetail => {
          if (fDetail.id === id) {
            return {
              ...fDetail,
              [name]: value
            }
          }
          return fDetail
        })
    })
  }

  const onChangeTableLength = (e) => {
    const { name, value } = e.target;
    setCutSpreadSheetForm({
      ...cutSpreadSheetForm,
      [name]: value
    })
  }

  const onChangeDetails = (e) => {
    const { name, value } = e.target;

    setCutSpreadSheetForm({
      ...cutSpreadSheetForm,
      [name]: value
    })
  }

  const cutSpreadSheetToSendMapper = (cutSpreadSheetForm) => {
    return {
      id: cutSpreadSheetForm.id,
      amountPerSizeForProducts: cutSpreadSheetForm.amountPerSizeForProductDTO.map(a => {
        return {
          ...a,
          product: {
            id: a.productForLoteDTO.id
          }
        }
      }
      ),
      fabricLengthDetails: cutSpreadSheetForm.fabricLengthDetailsDTOs.map(f => {
        return {
          ...f,
          fabric: {
            id: f.fabricNombreCodigoTipoImgDTO.id
          }
        }
      }),
      details: cutSpreadSheetForm.details,
      tableLength: cutSpreadSheetForm.tableLength,
    }
  }

  const onSubmit = () => {
    if (Object.keys(cutSpreadSheetValidator(cutSpreadSheetForm)).length === 0) {
      setErrors({});
      updateCutSpreadSheet(cutSpreadSheetToSendMapper(cutSpreadSheetForm), setCutSpreadSheet, setEditMode);
    } else {
      setErrors(Object.keys(cutSpreadSheetValidator(cutSpreadSheetForm)));
      errorAlert({ title: "Error en las cantidades", text: "Las cantidades deben ser mayor o igual a 0" })
    }
  }

  return (
    <>
      <div className="container d-flex row gap-3">
        <div className="d-flex column d-flex justify-content-between">
          {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">Planilla corte</h1> */}
          <h2 className="modal-title" id="staticBackdropLabel">Planilla corte</h2>

          <button type="button" className="btn-close" aria-label="Close" onClick={() => setCutSpreadSheetIsOpen(false)} ></button>
        </div>
        <hr />
        <div className="container d-flex row gap-3">

          {
            cutSpreadSheetForm && cutSpreadSheetForm.amountPerSizeForProductDTO &&
            cutSpreadSheetForm.amountPerSizeForProductDTO.map(amount => (
              <div key={amount.id} className="container d-flex row col border">
                <div className="d-flex row">
                  <div className="d-flex row gap-2 col justify-content-center">
                    <b>{amount.productForLoteDTO.nombre}</b>
                    <a href={amount.productForLoteDTO.urlFile} target="_blank">
                      <img src={amount.productForLoteDTO.urlFile} alt={amount.productForLoteDTO.nombre} style={{ maxHeight: "10rem", maxWidth: "10rem", minWidth: "10rem", objectFit: "cover" }} />
                    </a>
                  </div>
                  <div className="container col">

                    <table className="table table-success">
                      <thead>
                        <tr>
                          <th>Talle</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>

                        {

                          Object.entries(amount.amountPerSize).map(([key, value]) => (
                            <tr key={key}>
                              <th>{key}</th>
                              <th>
                                {!editMode ? value :
                                  <input className="form-control"
                                    name={key}
                                    value={value}
                                    type="number"
                                    style={{ maxWidth: "6rem" }}
                                    onChange={(e) => onSheetChange(e, amount.id)} />
                                }
                              </th>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>

                  </div>
                </div>
                <div></div>
                <hr />
              </div>
            ))

          }
        </div>
        <div className="container d-flex row gap-2">
          <h5>Detalles de capas</h5>
          <hr />
          {
            cutSpreadSheetForm.fabricLengthDetailsDTOs &&
            cutSpreadSheetForm.fabricLengthDetailsDTOs.map(fabricDetails => (
              <div key={fabricDetails.id} className="container d-flex column align-items-center border">
                <div className="col-1">
                  {fabricDetails.fabricNombreCodigoTipoImgDTO.id}
                </div>
                <div className="col-3">
                  <a href={fabricDetails.fabricNombreCodigoTipoImgDTO.urlFile} target="_blank">
                    <img src={fabricDetails.fabricNombreCodigoTipoImgDTO.urlFile} alt={fabricDetails.fabricNombreCodigoTipoImgDTO.nombre} style={{ maxHeight: "6rem", maxWidth: "4rem" }} />
                  </a>
                </div>
                <div className="col-2">
                  {fabricDetails.fabricNombreCodigoTipoImgDTO.nombre}
                </div>
                <div className="col-2 d-flex column gap-3">
                  Cant. capas:
                  {!editMode ?
                    ` ${fabricDetails.numberOfLayers}`
                    :

                    <input className="form-control"
                      name='numberOfLayers'
                      value={fabricDetails.numberOfLayers}
                      type="number"
                      style={{ maxWidth: "10rem", minWidth: "4rem" }}
                      onChange={(e) => onChangeNumberOfLayers(e, fabricDetails.id)} />
                  }
                </div>
              </div>
            ))

          }
        </div>
        <hr />
        <div>
          <b>Largo de la mesa:</b>

          {
            !editMode ?
              ` ${cutSpreadSheetForm.tableLength}`
              :
              <input className="form-control"
                name='tableLength'
                value={cutSpreadSheetForm.tableLength}
                type="number"
                style={{ maxWidth: "10rem", minWidth: "4rem" }}
                onChange={onChangeTableLength} />
          }
        </div>

        <hr />
        {/* Detalles: */}
        {
          !editMode ?
            <div>
              <h6>Detalles adicionales</h6>
              <p>{cutSpreadSheetForm.details}</p>
            </div>
            :

            <div className="form-floating">
              <textarea
                className="form-control"
                name="details"
                value={cutSpreadSheetForm.details || ""}
                id="details"
                style={{ height: "100px" }}
                onChange={onChangeDetails}
              >
              </textarea>
              <label htmlFor="floatingTextarea2">Detalles</label>
            </div>
        }


        {
          hasAnyRole(login.user.authorities, ["UPDATE_CUT_SPREADSHEET"]) &&

          <div div className="container mt-4 mb-3 d-flex row gap-3">
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

      </div >

    </>
  )
}