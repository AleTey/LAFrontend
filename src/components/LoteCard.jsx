import { useContext, useState } from "react"
import { ProductCardBasicThumbnail } from "./ProductCardBasicThumbnail"
import { LoteContext } from "../context/LoteContext"
import { messageInfo } from "./alerts/messageInfo"
import { LoteButtonsActions } from "./LoteButtonsActions"
import { CutSpreadSheet } from "./CutSpreadSheet"
import { PreparationSpreadSheet } from "./PreparationSpreadSheet"
import { useLote } from "../hooks/lotes/useLote"

export const LoteCard = ({ lote }) => {

  const { changeStatus,
    findCutSpreadSheetById

  } = useLote();

  const [cutSpreadSheetIsOpen, setCutSpreadSheetIsOpen] = useState(false);

  const [cutSpreadSheet, setCutSpreadSheet] = useState({});

  const [preparationSpreadSheetIsOpen, setPreparationSpreadSheetIsOpen] = useState();

  const [preparationSpreadSheet, setPreparationSpreadsheet] = useState({});

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
    findPreparationSpreadSheetById(id)
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
            setPreparationSpreadSheet={setPreparationSpreadsheet}
            setPreparationSpreadSheetIsOpen={setPreparationSpreadSheetIsOpen}

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
      </div>
    </>
  )
}