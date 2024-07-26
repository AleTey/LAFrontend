import { useContext, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext.Jsx";

export const useWarehouse = () => {

  const [warehouses, setWarehouses] = useState([]);

  const [paginator, setPaginator] = useState({});

  const { handlerLogout } = useContext(AuthContext);

  const findAll = async () => {
    const res = await fetch('http://localhost:8080/warehouse');
    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson)

      const wareHouseListWithImg = resJson.map(w => {
        if (w.product.img) {
          return {
            ...w,
            product: {
              ...w.product,
              img: `data:image/jpeg;base64,${w.product.img}`
            }
          }
        } else {
          return {
            ...w,
            product: {
              ...w.product,
              img: null
            }
          }
        }
      })
      setWarehouses(wareHouseListWithImg);
      console.log(resJson);
    }
  }
  const findPageByString = async (string, page = 0) => {
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/warehouse/page/search`)
    url.searchParams.append('string', string);
    url.searchParams.append('page', page);
    url.searchParams.append('size', 1);
    const res = await fetch(url.toString(), {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson)

      const wareHouseListWithImg = resJson.content.map(w => {
        if (w.product.img) {
          return {
            ...w,
            product: {
              ...w.product,
              img: `data:image/jpeg;base64,${w.product.img}`
            }
          }
        } else {
          return {
            ...w,
            product: {
              ...w.product,
              img: null
            }
          }
        }
      })

      setWarehouses(wareHouseListWithImg);
      setPaginator(resJson);

    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const updateWarehouse = async (warehouseForm, setFormHasChanged) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/warehouse`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...warehouseForm,
        product: {
          id: warehouseForm.product.id
        }
      })
    })

    if (res.ok) {
      const resJson = await res.json();
      onUpdateWarehouseList(warehouseForm)
      setFormHasChanged(false);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const onUpdateWarehouseList = (warehouse) => {
    setWarehouses(
      warehouses.map(w => {
        if (w.id === warehouse.id) {
          return { ...warehouse };
        }
        return { ...w };
      })
    )
  }



  return {
    warehouses,
    paginator,
    findAll,
    findPageByString,
    onUpdateWarehouseList,
    updateWarehouse,
  }
}