import { useEffect, useState } from "react"
import { Seeker } from "../components/Seeker"
import { WarehouseCard } from "../components/WarehouseCard";
import { useWarehouse } from "../hooks/useWarehouse";
import { Searcher } from "../components/Searcher";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const Warehouse = () => {

  const [warehouseList, setWarehouseList] = useState([]);

  const [stringToSearch, setStringToSearch] = useState("");

  const { warehouses, paginator, findPageByString, onUpdateWarehouseList, findAll } = useWarehouse();


  const { page } = useParams();


  useEffect(() => {
    if (stringToSearch) {
      findPageByString(stringToSearch, page);
    }
    // findAll();
  }, [, page]);

  return (
    <>
      <div className="container-sm">
        <h3 className="my-3">Depósito</h3>
        <hr />

        <Searcher
          path={'warehouse'}
          pageNumber={page}
          onClickSearch={findPageByString}
          setStringToSearch={setStringToSearch}
        />

        {
          warehouses && warehouses.map(w => (
            <WarehouseCard
              key={w.id}
              warehouse={w}
              onUpdateWarehouseList={onUpdateWarehouseList}
            />
          ))
        }

        <Paginator
          paginator={paginator}
          path={'warehouse'}
        />

      </div>
    </>
  )
}