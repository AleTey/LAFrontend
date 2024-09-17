import { useContext, useState } from "react"
import { ProductCardBasicThumbnail } from "./ProductCardBasicThumbnail"
import { LoteButtonsActions } from "./LoteButtonsActions"
import { CutSpreadSheet } from "./CutSpreadSheet"
import { PreparationSpreadSheet } from "./PreparationSpreadSheet"
import { useLote } from "../hooks/lotes/useLote"
import { WorkshopSpreadSheep } from "./WorkshopSpreadSheet"
import { ControlSpreadSheet } from "./ControlSpreadSheet"
import { useCutSpreadsheet } from "../hooks/lotes/useCutSpreadsheet"
import { usePreparationSpreadsheet } from "../hooks/lotes/usePreparationSpreadsheet"
import { useWorkshopSpreadsheet } from "../hooks/lotes/useWorkshopSpreadsheet"
import { useControlSpreadsheet } from "../hooks/lotes/useControlSpreadsheet"
import { PreviousLoteStatus } from "./buttons/PreviousLoteStatus"
import { AuthContext } from "../auth/context/AuthContext"
import { hasAnyRole } from "../auth/utils/hasAnyRole"
import { DeleteButton } from "./buttons/DeleteButton"

export const LoteCard = ({ lote }) => {

  const { changeStatus,
    deleteLote,
    dispatcherRemove,
    previousState
  } = useLote();

  const { findCutSpreadSheetById } = useCutSpreadsheet();

  const { findPreparationSpreadSheetById } = usePreparationSpreadsheet();

  const [cutSpreadSheetIsOpen, setCutSpreadSheetIsOpen] = useState(false);

  const [cutSpreadSheet, setCutSpreadSheet] = useState({});

  const [preparationSpreadSheetIsOpen, setPreparationSpreadSheetIsOpen] = useState();

  const [preparationSpreadSheet, setPreparationSpreadsheet] = useState({});

  const [workshopSpreadSheetIsOpen, setWorkshopSpreadsheetIsOpen] = useState(false);

  const [workshopSpreadSheet, setWorkshopSpreadSheet] = useState({});

  const [controlSpreadSheetIsOpen, setControlSpreadSheetIsOpen] = useState(false);

  const [controlSpreadSheet, setControlSpreadSheet] = useState({})

  const { findWorkshopSpreadsheetById } = useWorkshopSpreadsheet();

  const { findControlSpreedSheetById } = useControlSpreadsheet();

  const { login } = useContext(AuthContext);


  const onChangeStatus = (id, status) => {
    changeStatus(id, status);
  }

  const findCutSpreadSheet = (id) => {
    if (!cutSpreadSheet.id) {
      findCutSpreadSheetById(id, setCutSpreadSheet);
    }
  }

  const findPreparationSpreadSheet = (id) => {
    if (!preparationSpreadSheet.id) {
      findPreparationSpreadSheetById(id, setPreparationSpreadsheet);
    }
  }

  const findWorkshopSpreadsheet = (id) => {
    if (!workshopSpreadSheet.id) {
      findWorkshopSpreadsheetById(id, setWorkshopSpreadSheet);
    }
  }

  const findControlSpreadSheet = (id) => {
    findControlSpreedSheetById(id, setControlSpreadSheet);
  }

  const openCloseSheetManager = (setSpreadsheetOpen) => {
    setCutSpreadSheetIsOpen(false);
    setPreparationSpreadSheetIsOpen(false);
    setWorkshopSpreadsheetIsOpen(false);
    setControlSpreadSheetIsOpen(false);
    setSpreadsheetOpen(true);
  }

  return (
    <>
      {/* <div className="col-6 col-lg-3"> */}
        <div className="card mb-3 border-primary">
          <div className="card-header d-flex justify-content-between">
            <h4 className="text-primary-emphasis"><b>Lote: {lote.id}</b></h4>
            {
              hasAnyRole(login.user.authorities, ["ROLE_ADMIN"]) &&
              lote.status !== "COLA" &&
              <>
                <div>

                  <PreviousLoteStatus
                    loteId={lote.id}
                    // status={lote.status}
                    status={lote.status}
                  />
                  <DeleteButton
                    task={deleteLote}
                    id={lote.id}
                    state={lote.status}
                    dispatcherRemove={dispatcherRemove}
                  />
                </div>
              </>
            }
          </div>
          <div className="card-body">

            {
              <div>
                <p><b>Taller: </b>{lote.workShopDto.name}</p>
                <p><b>Estado: </b>{lote.status}</p>
                <p><b>Detalles: </b>{lote.additionalDetails}</p>
              </div>
            }
            <p><b>Productos:</b></p>
            {
              lote.productsForLoteDTO && lote.productsForLoteDTO.map(product => (
                <ProductCardBasicThumbnail
                  key={product.id}
                  product={product}
                />
                // </div>
              ))
            }
            <LoteButtonsActions
              key={lote.id}
              loteId={lote.id}
              loteStatus={lote.status}
              onChangeStatus={onChangeStatus}
              findCutSpreadSheet={findCutSpreadSheet}
              lote={lote}
              setCutSpreadSheetIsOpen={setCutSpreadSheetIsOpen}
              findPreparationSpreadSheet={findPreparationSpreadSheet}
              setPreparationSpreadSheetIsOpen={setPreparationSpreadSheetIsOpen}
              setWorkshopSpreadsheetIsOpen={setWorkshopSpreadsheetIsOpen}
              findWorkshopSpreadsheet={findWorkshopSpreadsheet}
              findControlSpreadSheet={findControlSpreadSheet}
              setControlSpreadSheetIsOpen={setControlSpreadSheetIsOpen}
              openCloseSheetManager={openCloseSheetManager}
            />

          </div>
          <div className="card-footer text-body-secondary">
            fecha de creación: {lote.creationDate}
          </div>

          {/* PLANILLAS */}

          {
            cutSpreadSheetIsOpen &&
            <div className="card-footer text-body-secondary">
              <CutSpreadSheet
                cutSpreadSheet={cutSpreadSheet}
                setCutSpreadSheet={setCutSpreadSheet}
                setCutSpreadSheetIsOpen={setCutSpreadSheetIsOpen}
              />
            </div>
          }

          {
            preparationSpreadSheetIsOpen &&
            <div className="card-footer text-body-secondary d-flex justify-content-center">
              <PreparationSpreadSheet
                preparationSpreadSheet={preparationSpreadSheet}
                setPreparationSpreadSheet={setPreparationSpreadsheet}
                setPreparationSpreadSheetIsOpen={setPreparationSpreadSheetIsOpen}
              />
            </div>
          }

          {
            workshopSpreadSheetIsOpen &&
            <div className="card-footer text-body-secondary d-flex justify-content-center">
              <WorkshopSpreadSheep
                workshopSpreadSheet={workshopSpreadSheet}
                setWorkshopSpreadSheet={setWorkshopSpreadSheet}
                setWorkshopSpreadSheetIsOpen={setWorkshopSpreadsheetIsOpen}
              />
            </div>
          }

          {
            controlSpreadSheetIsOpen &&
            <div className="card-footer text-body-secondary d-flex justify-content-center">
              <ControlSpreadSheet
                controlSpreadSheet={controlSpreadSheet}
                setControlSpreadSheet={setControlSpreadSheet}
                setControlSpreadSheetIsOpen={setControlSpreadSheetIsOpen}
              />
            </div>
          }

        </div>
      {/* </div> */}
    </>
  )
}