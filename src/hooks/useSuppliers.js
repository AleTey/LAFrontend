import {useReducer, useState } from "react"
import Swal from "sweetalert2";
import { suppliersReducer } from "../reducers/suppliersReducer";

export const useSuppliers = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [supplierWasAdded, setSupplierWasAdded] = useState(false);
  const [supplierWasDeleted, setSupplierWasDeleted] = useState(false);
  const [supplierWasEdited, setSupplierWasEdited] = useState(false);

  const [suppliers, dispatch] = useReducer(suppliersReducer, []);

  // console.log(suppliers)

  const onNewSupplier = () => {
    setModalIsOpen(true);
  }

  const getSuppliers = async () => {
    // const res = await fetch("http://localhost:1000/distribuidores")
    const res = await fetch("http://localhost:8080/suppliers")
    const json = await res.json();
    dispatch({
      type: 'LOADING-SUPPLIERS',
      payload: json
    })
  }

  const addSupplier = async (supplierForm) => {
    const response = await fetch("http://localhost:1000/distribuidores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(supplierForm)
    })
    if (response.ok) {
      const json = await response.json();
      dispatch({
        type: "ADD-SUPPLIERS",
        payload: json
      })
      setSupplierWasAdded(true);
      setTimeout(() => {
        setSupplierWasAdded(false);
      }, 5000);
      // onCloseModal();
    } else {
      console.log(response);
      console.log("ERROR")
    }
  }

  const editSupplier = async (id, supplierForm) => {
    const response = await fetch(`http://localhost:1000/distribuidores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(supplierForm)
    });
    if (response.ok) {
      const json = await response.json();
      dispatch({
        type: "EDIT-SUPPLIER",
        payload: supplierForm
      })
      setSupplierWasEdited(true);
      setTimeout(() => {
        setSupplierWasEdited(false);
      }, 5000);
    } else {
      console.log(response);
      console.log("ERROR")
    }
  }

  const onDeleteSupplier = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        const deleteConfirmed = async () => {

          const response = await fetch(`http://localhost:1000/distribuidores/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
          });
          if (response.ok) {
            const json = response.json();
            dispatch({
              type: "REMOVE-SUPPLIER",
              payload: id
            });
            setSupplierWasDeleted(true);
            setTimeout(() => {
              setSupplierWasDeleted(false);
            }, 5000)
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else {
            //ELIMINAR CONSOLE LOG
            console.log("Error en el if");
          }
        }
        deleteConfirmed();
      }
    });
  }

  return {
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
    onDeleteSupplier
  }
}