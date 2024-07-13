import { useEffect, useState } from "react"
import { Seeker } from "../components/Seeker"
import { WarehouseCard } from "../components/WarehouseCard";

export const Warehouse = () => {

  const [warehouseList, setWarehouseList] = useState([]);

  // const getAllWarehouses = () => {
  //   const findAll = async() => {
  //     const res = await fetch('http://localhost:8080/warehouse');
  //     if (res.ok) {
  //       const resJson = await res.json();
  //       setWarehouseList(resJson);
  //       console.log(resJson);
  //     }
  //   }
  // }
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

      setWarehouseList(wareHouseListWithImg);


      console.log(resJson);
    }
  }

  const onUpdateWarehouseList = (warehouse) => {
    setWarehouseList(
      warehouseList.map(w => {
        if (w.id === warehouse.id) {
          return { ...warehouse };
        }
        return { ...w };
      })
    )
  }

  useEffect(() => {
    findAll();
  }, []);

  return (
    <>
      <div className="container-sm">
        <h3 className="my-3">Depósito</h3>
        <hr />

        <Seeker

        />

        {
          warehouseList && warehouseList.map(w => (
            <WarehouseCard
              key={w.id}
              warehouse={w}
              onUpdateWarehouseList={onUpdateWarehouseList}
            />
          ))
        }

      </div>
    </>
  )
}