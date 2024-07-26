import { useEffect, useState } from "react";
import { useSuppliers } from "../hooks/useSuppliers"
import { SupplierContext } from "./SupplierContext"

export const SupplierProvider = ({ children }) => {

  const { modalIsOpen,
    setModalIsOpen,
    supplierWasAdded,
    setSupplierWasAdded,
    supplierWasDeleted,
    supplierWasEdited,
    suppliers,
    dispatch,
    onNewSupplier,
    getSuppliers,
    addSupplier,
    editSupplier,
    onDeleteSupplier,
    getSimplestTextileSuppliers } = useSuppliers();

  const [data, setData] = useState("hay datos")

  useEffect(() => {
    console.log(suppliers)
  }, [])

  return (
    <SupplierContext.Provider value={
      {
        modalIsOpen,
        setModalIsOpen,
        supplierWasAdded,
        setSupplierWasAdded,
        supplierWasDeleted,
        supplierWasEdited,
        suppliers,
        dispatch,
        onNewSupplier,
        getSuppliers,
        addSupplier,
        editSupplier,
        onDeleteSupplier,
        getSimplestTextileSuppliers
      }
    }>
      {children}
    </SupplierContext.Provider>
  );

}