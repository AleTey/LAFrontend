import Swal from 'sweetalert2';

export const areUSure = async ({ question, message }) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  const result = await swalWithBootstrapButtons.fire({
    title: question,  // Cambiado de { question } a question
    text: message,    // Cambiado de { message } a message
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "No, cancelar!",
    reverseButtons: true
  });

  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Hecho!",
      text: "Operación realizada.",
      icon: "success"
    });
    return true;
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire({
      title: "Operación cancelada",
      text: "",
      icon: "error"
    });
    return false;
  }
}


// import Swal from 'sweetalert2'

// export const areUSure = async ({ question, message }) => {

//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger"
//     },
//     buttonsStyling: false
//   });
//   const result = await swalWithBootstrapButtons.fire({
//     title: question,
//     text: message,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Si, continuar",
//     cancelButtonText: "No, cancelar!",
//     reverseButtons: true
//   }).then((result) => {
//     if (result.isConfirmed) {
//       swalWithBootstrapButtons.fire({
//         title: "Hecho!",
//         text: "Operación realizada.",
//         icon: "success"
//       });
//       return true;
//     } else if (
//       /* Read more about handling dismissals below */
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
//       swalWithBootstrapButtons.fire({
//         title: "Operación cancelada",
//         text: "",
//         icon: "error"
//       });
//       return false;
//     }
//   });
// }