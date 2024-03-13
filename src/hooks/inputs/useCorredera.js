import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { InputModalContext } from "../../context/InputModalContext";
import { CorrederaContext } from "../../context/CorrederaContext";


export const useCorredera = () => {

  const [correderaFormIsActive, setCorrederaFormIsActive] = useState(false);

  const { correderas,
    dispatchGetAllCorrederas,
    dispatchAddCorredera,
    dispatchUploadCorredera,
    dispatchDeleteCorredera } = useContext(CorrederaContext);

  const {
    toggle,
    modalSelectionHandler,
    setInputDbHasChanged } = useContext(InputModalContext);



  const findAllCorrederas = async () => {
    const getCorrederas = await fetch("http://localhost:8080/correderas")
    if (getCorrederas.ok) {
      const correderasJson = await getCorrederas.json();
      dispatchGetAllCorrederas(correderasJson)
    }
  }

  const addNewCorredera = async (newCorredera) => {
    try {
      const saveCorredera = await fetch("http://localhost:8080/correderas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCorredera)
      });

      if (saveCorredera.ok) {
        const correderaJson = await saveCorredera.json();

        dispatchAddCorredera(correderaJson);
        setInputDbHasChanged("correderaSaved");
        setTimeout(() => {
          setInputDbHasChanged("false");
        }, 8000)
        toggle()
        modalSelectionHandler("");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const updateCorredera = async (modifiedFields, id, formIsOpen) => {

    if (modifiedFields.proveedor) {
      modifiedFields.proveedor = modifiedFields.proveedor.id;
    }

    const params = new URLSearchParams(modifiedFields).toString();

    const editCorredera = await fetch(`http://localhost:8080/correderas/${id}?${params}`, {
      method: "PUT",
    });
    if (editCorredera.ok) {
      const editCorrederaJson = await editCorredera.json();
      dispatchUploadCorredera(editCorrederaJson);
      toggle()
      modalSelectionHandler("");
      setInputDbHasChanged("correderaUpdated");
      setTimeout(() => {
        setInputDbHasChanged("");
      }, 8000);
      formIsOpen(false);
    }
  }

  const onDeleteCorredera = (id) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Seguro desea eliminar?",
      text: "Está acción no puede revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteCorredera = async () => {

          const deleteCorredera = await fetch(`http://localhost:8080/correderas/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })
          if (deleteCorredera.ok) {

            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "Insumo eliminado con éxito",
              icon: "success"
            });

            dispatchDeleteCorredera(id);

            setInputDbHasChanged("correderaDeleted");
            setTimeout(() => {
              setInputDbHasChanged("");
            }, 8000);

          }
        }
        deleteCorredera()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  return {
    correderas,
    correderaFormIsActive,
    setCorrederaFormIsActive,
    findAllCorrederas,
    addNewCorredera,
    updateCorredera,
    onDeleteCorredera
  }
}