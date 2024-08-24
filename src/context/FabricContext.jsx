import { createContext, useState } from "react";
import { useFabric } from "../hooks/useFabric";

export const FabricContext = createContext();

export const FabricProvider = ({ children }) => {

  const [paginator, setPaginator] = useState({});

  // const [fabricIsLoading, setFabricIsLoading] = useState(false);


  const { fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabricsPages,
    getAllFabricsDtoPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString,
    searchFabricDtoByString,
    fabricIsLoading,
    setFabricIsLoading } = useFabric();

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
        fabricIsLoading,
        setFabricIsLoading,
      }}
    >
      {children}
    </FabricContext.Provider>
  )
}