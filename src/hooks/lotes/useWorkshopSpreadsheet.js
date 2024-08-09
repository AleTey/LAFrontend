import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";
import { useOrderAmountPerSize } from "../utils/useOrderAmountPerSize";

export const useWorkshopSpreadsheet = () => {

  const { handlerLogout } = useContext(AuthContext);


  const findWorkshopSpreadsheetById = async (id, setWorkshopSpreadSheet) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/workshop-spreadsheet/dto/${id}`, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      });

      if (res.ok) {
        const resJson = await res.json();
        console.log(resJson)

        setWorkshopSpreadSheet({
          ...resJson,
          amountPerSizeForProducts: resJson.amountPerSizeForProducts.map(amount => {
            if (amount.productForLoteDTO.img) {
              return {
                ...amount,
                amountPerSize: useOrderAmountPerSize(amount.amountPerSize),
                productForLoteDTO: {
                  ...amount.productForLoteDTO,
                  img: `data:image/jpeg;base64,${amount.productForLoteDTO.img}`
                }
              }
            }
            return {
              ...amount,
              amountPerSize: useOrderAmountPerSize(amount.amountPerSize),
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
                amountPerSize: useOrderAmountPerSize(amountDefective.amountPerSize),
                productForLoteDTO: {
                  ...amountDefective.productForLoteDTO,
                  img: `data:image/jpeg;base64,${amountDefective.productForLoteDTO.img}`
                }
              }
            }
            return {
              ...amountDefective,
              amountPerSize: useOrderAmountPerSize(amountDefective.amountPerSize),
              productForLoteDTO: {
                ...amountDefective.productForLoteDTO,
                img: null
              }
            }
          })
        });
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }
    } catch (error) {

    }
  }


  const updateWorkshopSpreadSheet = async (updatedWorkshopSpreadSheet, setWorkshopSpreadSheet, workshopSpreedSheetForm, setEditMode) => {
    console.log(updatedWorkshopSpreadSheet);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/workshop-spreadsheet`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedWorkshopSpreadSheet)
    })
    if (res.ok) {
      const resJson = await res.json();
      console.log('JSON RES')
      console.log(resJson);
      setWorkshopSpreadSheet(workshopSpreedSheetForm);
      setEditMode(false);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }
  return {
    findWorkshopSpreadsheetById,
    updateWorkshopSpreadSheet
  }
}