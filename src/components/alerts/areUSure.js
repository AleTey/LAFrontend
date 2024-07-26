import Swal from 'sweetalert2'

export const areUSure = ({ question, message }) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: { question },
    text: { message },
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, continuar",
    cancelButtonText: "No, cancelar!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Hecho!",
        text: "Operación realizada.",
        icon: "success"
      });
      return true;
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Operación cancelada",
        text: "",
        icon: "error"
      });
      return false;
    }
  });
}