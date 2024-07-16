import { useState } from "react";

export const useWarehouse = () => {

  const [warehouses, setWarehouses] = useState([]);

  const [paginator, setPaginator] = useState({});

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
    const url = new URL('http://localhost:8080/warehouse/page/search')
    url.searchParams.append('string', string);
    url.searchParams.append('page', page);
    url.searchParams.append('size', 1);
    const res = await fetch(url.toString());
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

      // console.log(resJson);
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
  }
}