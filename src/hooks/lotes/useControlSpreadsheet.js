import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";

export const useControlSpreadsheet = () => {

  const { handlerLogout } = useContext(AuthContext);


  const findControlSpreedSheetById = async (id, setControlSpreadSheet) => {

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/control-spreadsheet/dto/${id}`, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      });

      if (res.ok) {
        const resJson = await res.json();
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
      } else {
        const error = await res.json();
        if (error.message === "Please Login") {
          handlerLogout();
        }
      }

    } catch (error) {

    }
  }

  const updateControlSpreadSheet = async (updatedControlSpreadSheet, setControlSpreadSheet, setEditMode, controlSpreadSheetForm) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/control-spreadsheet`, {
      method: 'PUT',
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedControlSpreadSheet)
    })
    if (res.ok) {
      const resJson = await res.json();
      setControlSpreadSheet(controlSpreadSheetForm);
      setEditMode(false);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  return {
    findControlSpreedSheetById,
    updateControlSpreadSheet
  }
}