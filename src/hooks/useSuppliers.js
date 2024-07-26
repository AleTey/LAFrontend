import { useContext, useReducer, useState } from "react"
import Swal from "sweetalert2";
import { suppliersReducer } from "../reducers/suppliersReducer";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { useAuth } from "../auth/hook/useAuth";

export const useSuppliers = () => {

  // const { handlerLogout } = useAuth();
  const { login, handlerLogout } = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [supplierWasAdded, setSupplierWasAdded] = useState(false);
  const [supplierWasDeleted, setSupplierWasDeleted] = useState(false);
  const [supplierWasEdited, setSupplierWasEdited] = useState(false);

  const [suppliers, dispatch] = useReducer(suppliersReducer, []);



  const onNewSupplier = () => {
    setModalIsOpen(true);
  }

  const getSuppliers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/suppliers`, {
      method: 'GET',
      headers: {
        "Authorization": sessionStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      console.log("fetch suppliers")
      const json = await res.json();
      dispatch({
        type: 'LOADING-SUPPLIERS',
        payload: json
      })
      console.log(suppliers);
    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const addSupplier = async (supplierForm) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/suppliers/supplier`, {
      method: "POST",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
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
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }
  }

  const editSupplier = async (id, supplierForm) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
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
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
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

          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/suppliers/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": sessionStorage.getItem("token"),
              "Content-Type": "application/json"
            },
          });
          if (response.ok) {
            // const json = response.json();
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
            const error = await res.json();
            if (error.message === "Please Login") {
              handlerLogout();
            }
          }
        }
        deleteConfirmed();
      }
    });
  }

  const getSimplestSuppliers = async (setTextileSuppliers, setFabricOnEdit, fabricForm) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/suppliers/simplest`, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      })
      if (response.ok) {
        const json = await response.json();
        console.log(json)
        setTextileSuppliers(json)
        // setTextileSuppliers(() => (
        //   json.filter(sup => sup.sector && sup.sector.toLowerCase() === "textil")
        // ))
        if (fabricForm.id !== 0) {
          setFabricOnEdit(() => (
            json.filter(sup => sup.id === fabricForm.proveedor.id)
          ))
        } else {
          const error = await res.json();
          if (error.message === "Please Login") {
            handlerLogout();
          }
        }
      }
    } catch (error) {

    }
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
    onDeleteSupplier,
    getSimplestSuppliers
  }
}