import Swal from 'sweetalert2'
export const messageInfo = ({ message }) => {
  Swal.fire({
    title: message,
    showClass: {
      popup: `
  animate__animated
  animate__fadeInUp
  animate__faster
  `
    },
    hideClass: {
      popup: `
  animate__animated
  animate__fadeOutDown
  animate__faster
  `
    }
  });
}