export const usePreparationSpreadsheet = () => {

  const findPreparationSpreadSheetById = async (id, setPreparationSpreadsheet) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/preparation-spreadsheet/dto/${id}`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })

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
    } else {
      const error = await res.json();
      if (error.message === "Pleas Login") {
        handlerLogout();
      }
    }
  }

  const updatePreparationSpreadSheet = async (preparationSpreadSForm, preparationSpreadSheetForm, setPreparationSpreadSheet, setEditMode) => {
    console.log(preparationSpreadSForm);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/preparation-spreadsheet`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preparationSpreadSForm)
    })

    if (res.ok) {
      const resJson = await res.json();
      setPreparationSpreadSheet(preparationSpreadSheetForm);
      setEditMode(false);
      console.log(resJson);
    } else {
      const error = await res.json();
      if (error.message === "Pleas Login") {
        handlerLogout();
      }
    }
  }

  const updateImagePreparationSpreadSheet = async (idSheet, img, preparationSpreadSheetForm, setPreparationSpreadSheet) => {

    console.log("CAMBIANDO IMAGEN");
    console.log(img)
    let imageFile = new FormData();
    imageFile.append(`imageFile`, img);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/preparation-spreadsheet/put-img/${idSheet}`, {
      method: 'PUT',
      headers: {
        "Authorization": sessionStorage.getItem("token")
      },
      body: imageFile
    })
    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson);
      setPreparationSpreadSheet({
        ...preparationSpreadSheetForm,
        img: `data:image/jpeg;base64,${resJson.image}`
      })
    } else {
      const error = await res.json();
      if (error.message === "Pleas Login") {
        handlerLogout();
      }
    }
  }

  const inputsCalculator = async (id, setInputQuantityForSpreadSheetList) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/input-quantity/${id}`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson)
      setInputQuantityForSpreadSheetList(resJson);
    } else {
      const error = await res.json();
      if (error.message === "Pleas Login") {
        handlerLogout();
      }
    }
  };



  return {
    findPreparationSpreadSheetById,
    updatePreparationSpreadSheet,
    updateImagePreparationSpreadSheet,
    inputsCalculator
  }
}