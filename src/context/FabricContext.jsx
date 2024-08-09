import { createContext, useState } from "react";
import { useFabric } from "../hooks/useFabric";

export const FabricContext = createContext();

export const FabricProvider = ({ children }) => {

  const [paginator, setPaginator] = useState({})


  const { fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    // usePaginator,
    // setUsePaginator,
    // paginator,
    // setPaginator,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabricsPages,
    getAllFabricsDtoPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString,
    searchFabricDtoByString, } = useFabric();

  // const [paginator, setPaginator] = useState(usePaginator || {});

  return (
    <FabricContext.Provider
      value={{
        fabricModalIsOpen,
        fabricWasAdded,
        fabricWasEdited,
        fabricWasDeleted,
        fabrics,
        paginator,
        setPaginator,
        setFabricModalIsOpen,
        onNewFabric,
        getAllFabricsPages,
        getAllFabricsDtoPages,
        addNewFabric,
        editFabric,
        onDeleteFabric,
        searchFabricByString,
        searchFabricDtoByString,
      }}
    >
      {children}
    </FabricContext.Provider>
  )
}