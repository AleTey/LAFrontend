import { createContext, useState } from "react";
import { useFabric } from "../hooks/useFabric";

export const FabricContext = createContext();

export const FabricProvider = ({ children }) => {


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
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString, } = useFabric();

  // const [paginator, setPaginator] = useState(usePaginator || {});

  return (
    <FabricContext.Provider
      value={{
        fabricModalIsOpen,
        fabricWasAdded,
        fabricWasEdited,
        fabricWasDeleted,
        fabrics,
        // paginator,
        // setPaginator,
        setFabricModalIsOpen,
        onNewFabric,
        getAllFabricsPages,
        addNewFabric,
        editFabric,
        onDeleteFabric,
        searchFabricByString,
      }}
    >
      {children}
    </FabricContext.Provider>
  )
}