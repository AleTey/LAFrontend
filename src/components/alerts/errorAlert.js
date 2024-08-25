import Swal from 'sweetalert2';


export const errorAlert = ({title, text}) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}