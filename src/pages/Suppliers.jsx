import { memo, useContext, useEffect } from "react"
import { SupplierCard } from "../components/SupplierCard"
import { NewSupplierModal } from "../components/NewSupplierModal";
import { useSuppliers } from "../hooks/useSuppliers";


export const Suppliers = () => {


  const {
    modalIsOpen,
    supplierWasAdded,
    supplierWasDeleted,
    supplierWasEdited,
    suppliers,
    setModalIsOpen,
    setSupplierWasAdded,
    onNewSupplier,
    getSuppliers,
    addSupplier,
    editSupplier,
    onDeleteSupplier
  } = useSuppliers();



  useEffect(() => {
    getSuppliers();
  }, [])



  return (
    <>
      {
        supplierWasAdded &&
        <div className="alert alert-success fixed-top" role="alert">
          Operación realizada exitosamente
        </div>
      }
      {
        supplierWasDeleted &&
        <div className="alert alert-success fixed-top" role="alert">
          Proveedor eliminado con éxito
        </div>
      }
      {
        supplierWasEdited &&
        <div className="alert alert-success fixed-top" role="alert">
          El proveedor fue editado con éxito
        </div>
      }
      <div className="container-sm">
        <h3 className="my-3">Proveedores</h3>
        <hr />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onNewSupplier}

        >
          Nuevo proveedor
        </button>
        <div className="container my-4">
          {
            modalIsOpen &&
            <NewSupplierModal
              supplierWasAdded={supplierWasAdded}
              setSupplierWasAdded={setSupplierWasAdded}
              setModalIsOpen={setModalIsOpen}
              addSupplier={addSupplier}
              editSupplier={editSupplier}
            />
          }
        </div>

        <section className="container row gap-3">

          {suppliers.length > 0 && suppliers.map(sup => (
            <SupplierCard
              key={sup.id}
              sup={sup}
              setSupplierWasAdded={setSupplierWasAdded}
              onDeleteSupplier={onDeleteSupplier}
              editSupplier={editSupplier}
            />
          ))}

        </section>

      </div>
    </>
  )
}

export default memo(Suppliers)