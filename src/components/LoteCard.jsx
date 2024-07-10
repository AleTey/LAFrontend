import { useState } from "react"
import { ProductCardBasicThumbnail } from "./ProductCardBasicThumbnail"
import { LoteButtonsActions } from "./LoteButtonsActions"
import { CutSpreadSheet } from "./CutSpreadSheet"
import { PreparationSpreadSheet } from "./PreparationSpreadSheet"
import { useLote } from "../hooks/lotes/useLote"
import { WorkshopSpreadSheep } from "./WorkshopSpreadSheet"
import { ControlSpreadSheet } from "./ControlSpreadSheet"

export const LoteCard = ({ lote }) => {

  const { changeStatus,
    findCutSpreadSheetById

  } = useLote();

  const [cutSpreadSheetIsOpen, setCutSpreadSheetIsOpen] = useState(false);

  const [cutSpreadSheet, setCutSpreadSheet] = useState({});

  const [preparationSpreadSheetIsOpen, setPreparationSpreadSheetIsOpen] = useState();

  const [preparationSpreadSheet, setPreparationSpreadsheet] = useState({});

  const [workshopSpreadSheetIsOpen, setWorkshopSpreadsheetIsOpen] = useState(false);

  const [workshopSpreadSheet, setWorkshopSpreadSheet] = useState({});

  const [controlSpreadSheetIsOpen, setControlSpreadSheetIsOpen] = useState(false);

  const [controlSpreadSheet, setControlSpreadSheet] = useState({})

  // const { dispatchRemoveQueueLote,
  //   dispatchRemoveCutLotes,
  //   dispatchRemovePreparationLote,
  //   dispatchRemoveWorkshopLote,
  //   dispatchRemoveControlLote,
  // } = useContext(LoteContext);


  const onChangeStatus = (id, status) => {
    changeStatus(id, status);
  }

  const findCutSpreadSheet = (id) => {
    findCutSpreadSheetById(id, setCutSpreadSheet);
  }

  const findPreparationSpreadSheet = (id) => {
    const findPreparationSpreadSheetById = async (id) => {
      const res = await fetch(`http://localhost:8080/preparation-spreadsheet/dto/${id}`)

      if (res.ok) {
        const resJson = await res.json();
        console.log(resJson);

        let inputsImage = "";
        if (resJson.img !== null) {
          inputsImage = `data:image/jpeg;base64,${resJson.img}`
        } else {
          inputsImage = null;
        }

        setPreparationSpreadsheet({
          ...resJson,
          amountPerSizeForProductDTOs: resJson.amountPerSizeForProductDTOs.map(amount => {
            const imgUrl = `data:image/jpeg;base64,${amount.productForLoteDTO.img}`;
            if (amount.productForLoteDTO.img) {
              return {
                ...amount,
                productForLoteDTO: {
                  ...amount.productForLoteDTO,
                  img: imgUrl
                }
              }
            }
            return {
              ...amount,
              productForLoteDTO: {
                ...amount.productForLoteDTO,
                img: null
              }
            }

          }),
          img: inputsImage
          // img: `data:image/jpeg;base64,${resJson.img}`
        })
        console.log(preparationSpreadSheet);
      }

    }
    if (!preparationSpreadSheet.id) {
      findPreparationSpreadSheetById(id)
    }
  }

  const findWorkshopSpreadsheet = (id) => {

    const findWorkshopSpreadsheetById = async (id) => {
      try {
        const res = await fetch(`http://localhost:8080/workshop-spreadsheet/dto/${id}`);

        if (res.ok) {
          const resJson = await res.json();
          console.log(resJson)

          setWorkshopSpreadSheet({
            ...resJson,
            amountPerSizeForProducts: resJson.amountPerSizeForProducts.map(amount => {
              if (amount.productForLoteDTO.img) {
                return {
                  ...amount,
                  productForLoteDTO: {
                    ...amount.productForLoteDTO,
                    img: `data:image/jpeg;base64,${amount.productForLoteDTO.img}`
                  }
                }
              }
              return {
                ...amount,
                productForLoteDTO: {
                  ...amount.productForLoteDTO,
                  img: null
                }
              }
            }),
            amountPerSizeDefectiveForProducts: resJson.amountPerSizeDefectiveForProducts.map(amountDefective => {
              if (amountDefective.productForLoteDTO.img) {
                return {
                  ...amountDefective,
                  productForLoteDTO: {
                    ...amountDefective.productForLoteDTO,
                    img: `data:image/jpeg;base64,${amountDefective.productForLoteDTO.img}`
                  }
                }
              }
              return {
                ...amountDefective,
                productForLoteDTO: {
                  ...amountDefective.productForLoteDTO,
                  img: null
                }
              }
            })


          });
        }
      } catch (error) {

      }
    }
    if (!workshopSpreadSheet.id) {
      findWorkshopSpreadsheetById(id);
    }

  }

  const findControlSpreadSheet = (id) => {

    const findControlSpreedSheetById = async (id) => {

      try {
        const res = await fetch(`http://localhost:8080/control-spreadsheet/dto/${id}`);

        if (res.ok) {
          const resJson = await res.json();
          console.log(resJson);
          setControlSpreadSheet({
            ...resJson,
            amountPerSizeForProductDTO: resJson.amountPerSizeForProductDTO.map(a => {
              if (a.productForLoteDTO.img) {
                return {
                  ...a,
                  productForLoteDTO: {
                    ...a.productForLoteDTO,
                    img: `data:image/jpeg;base64,${a.productForLoteDTO.img}`
                  }
                }
              }
              return {
                ...a,
                productForLoteDTO: {
                  ...a.productForLoteDTO,
                  img: null
                }
              }
            })
          })
        }

      } catch (error) {

      }



    }
    findControlSpreedSheetById(id);
  }

  return (
    <>

      <div className="card mb-3 border-primary">
        <div className="card-header">
          <h4 className="text-primary-emphasis"><b>Lote: {lote.id}</b></h4>
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
    </>
  )
}