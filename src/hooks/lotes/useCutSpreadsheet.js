import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";
import { useOrderAmountPerSize } from "../utils/useOrderAmountPerSize";

export const useCutSpreadsheet = () => {

  const { handlerLogout } = useContext(AuthContext);


  const findCutSpreadSheetById = async (id, setCutSpreadSheet) => {
    // console.log("BUSCANDO SPREADSHEET")
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cut-spreadsheets/${id}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    });

    if (res.ok) {
      const cutSpreadSheetJson = await res.json();
      console.log(cutSpreadSheetJson)

      setCutSpreadSheet({
        ...cutSpreadSheetJson,
        amountPerSizeForProductDTO:
          cutSpreadSheetJson.amountPerSizeForProductDTO
            .map(d => {
              const imgUrl = `data:image/jpeg;base64,${d.productForLoteDTO.img}`;
              if (d.productForLoteDTO.img) {
                return {
                  ...d,
                  amountPerSize: useOrderAmountPerSize(d.amountPerSize),
                  productForLoteDTO: {
                    ...d.productForLoteDTO,
                    img: imgUrl
                  }
                };
              };
              return {
                ...d,
                amountPerSize: useOrderAmountPerSize(d.amountPerSize),
                productForLoteDTO: {
                  ...d.productForLoteDTO,
                  img: null
                }
              };
            }),

        fabricLengthDetailsDTOs:
          cutSpreadSheetJson.fabricLengthDetailsDTOs.map(fDetail => {
            if (fDetail.fabricNombreCodigoTipoImgDTO.img) {
              const imgUrl = `data:image/jpeg;base64,${fDetail.fabricNombreCodigoTipoImgDTO.img}`
              return {
                ...fDetail,
                fabricNombreCodigoTipoImgDTO: {
                  ...fDetail.fabricNombreCodigoTipoImgDTO,
                  img: imgUrl
                }
              }
            }
            return {
              ...fDetail,
              fabricNombreCodigoTipoImgDTO: {
                ...fDetail.fabricNombreCodigoTipoImgDTO,
                img: null
              }
            }
          })

      })
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const updateCutSpreadSheet = async (c, setCutSpreadSheet, setEditMode) => {
    console.log(c)
    try {
      console.log("enter")
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cut-spreadsheets/${c.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(c)
      })
      console.log("finish")
      if (res.ok) {
        console.log("res is ok")
        const resJson = await res.json();
        console.log(resJson);
        setEditMode(false);
        setCutSpreadSheet(cutSpreadSheetForm);
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }
    } catch (error) {
      console.log("error" + error)
    }
  }

  return {
    findCutSpreadSheetById,
    updateCutSpreadSheet
  }
}