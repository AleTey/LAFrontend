import { useState } from "react"

const emptySupplierFormInitialState = {
  empresa: "",
  email: "",
  nombreContacto: "",
  celContacto: "",
  emailContacto: "",
  caracteristica: "54",
  calle: "",
  nro: "",
  localidad: "",
  sector: "",
  id: ""
}

const validationForm = (form) => {

  let errors = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;
  let regexTelefono = /^\d{7,14}$/;

  console.log("inicio validacion")

  if (!form.empresa.trim()) {
    errors.empresa = "Campo obligatorio";
  } else if (!regexName.test(form.empresa.trim())) {
    errors.empresa = "Se han encontrado caracteres inválidos"
  }

  if (!form.sector.trim()) {
    errors.sector = "El campo es obligatorio"
  } else if (!regexName.test(form.sector.trim())) {
    errors.sector = "Se han encontrado caracteres inválidos"
  }

  if (!form.nombreContacto.trim()) {
    errors.nombreContacto = "El campo es obligatorio"
  } else if (!regexName.test(form.nombreContacto.trim())) {
    errors.nombreContacto = "Se han encontrado caracteres inválidos en el campo"
  }

  if (!form.celContacto.trim()) {
    errors.celContacto = "El campo es obligatorio"
  } else if (regexTelefono.test(!form.celContacto.trim())) {
    errors.celContacto = "Formato invalido"
  }

  if (!form.caracteristica.trim()) {
    errors.caracteristica = "El campo es obligatorio";
  }

  if (!form.emailContacto.trim()) {
    errors.emailContacto = "El campo es obligatorio"
  } else if (!regexEmail.test(form.emailContacto.trim())) {
    errors.emailContacto = "Formato invalido"
  }
  console.log(errors)

  return errors;

}


export const NewSupplierModal = ({
  setSupplierWasAdded,
  setModalIsOpen,
  setIsEditSupplier,
  supplierFormInitialState = emptySupplierFormInitialState,
  editSupplier,
  addSupplier
}) => {

  const [supplierForm, setSupplierForm] = useState(supplierFormInitialState);


  const [errors, setErrors] = useState({});

  const onCloseModal = () => {
    if (setModalIsOpen) {
      setModalIsOpen(false);
    } else {
      setIsEditSupplier(false)
    }
  }

  const onChange = ({ target }) => {
    const { name, value } = target;
    setSupplierForm({
      ...supplierForm,
      [target.name]: target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validationForm(supplierForm));
    if (Object.keys(validationForm(supplierForm)).length !== 0) {
      console.log("invalid");
      console.log(errors);
    } else {
      if (!supplierForm.id) {
        console.log("valid: " + errors);
        console.log(errors);
        addSupplier(supplierForm);
        setSupplierForm(emptySupplierFormInitialState)
        onCloseModal()
        setErrors({})
      } else {
        editSupplier(supplierForm.id, supplierForm);
        setSupplierForm(emptySupplierFormInitialState)
        onCloseModal()
        setErrors({})
      }
    }
  }

  return (
    <>

      <div className="modal fade show" style={{ display: "block" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nuevo proveedor</h1>
              <button type="button" className="btn-close" onClick={onCloseModal}></button>
            </div>
            <div className="modal-body">

              <div className="container">

                <form action="" className="form-floating">

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputNombreEmpresa"
                      placeholder="nombre empresa"
                      name="empresa"
                      value={supplierForm.empresa}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputNombreEmpresa" className="h6">Nombre empresa</label>
                    {errors.empresa &&
                      <p className="text-danger">{errors.empresa}</p>
                    }
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmailEmpresa"
                      placeholder="email empresa"
                      name="email"
                      value={supplierForm.email}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputEmailEmpresa" className="h6">Email empresa</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputLocalidad"
                      placeholder="Localidad"
                      name="localidad"
                      value={supplierForm.localidad}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputLocalidad" className="h6">Localidad</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputSector"
                      placeholder="Sector"
                      name="sector"
                      value={supplierForm.sector}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputSector" className="h6">Sector</label>
                    {errors.sector &&
                      <p className="text-danger">{errors.sector}</p>
                    }
                  </div>

                  <h6><b>Dirección:</b></h6>
                  <br />
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputCalle"
                      placeholder="Calle"
                      name="calle"
                      value={supplierForm.calle}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputCalle" className="h6">Calle</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputNroCalle"
                      placeholder="Nro"
                      name="nro"
                      value={supplierForm.nro}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputNroCalle" className="h6">Nro</label>
                  </div>


                  <h6><b>Contacto:</b></h6>
                  <br />

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputNombreContacto"
                      placeholder="Nombre"
                      name="nombreContacto"
                      value={supplierForm.nombreContacto}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputNombreContacto" className="h6">Nombre contacto</label>
                    {
                      errors.nombreContacto &&
                      <p className="text-danger">{errors.nombreContacto}</p>
                    }

                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputEmailContacto"
                      placeholder="EmailContacto"
                      name="emailContacto"
                      value={supplierForm.emailContacto}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputEmailContacto" className="h6">Email contacto</label>
                    {errors.emailContacto &&
                      <p className="text-danger">{errors.emailContacto}</p>
                    }
                  </div>

                  <div className="row">

                    <div className="form-floating mb-3 col-md-3">
                      <input
                        type="text"
                        className="form-control w-2"
                        id="floatingInputCaracteristicaPais"
                        placeholder="0223"
                        name="caracteristica"
                        value={supplierForm.caracteristica}
                        onChange={onChange}
                      />
                      <label htmlFor="floatingInputCaracteristicaPais" className="h6">Código país</label>
                      {errors.caracteristica &&
                        <p className="text-danger">{errors.caracteristica}</p>
                      }
                    </div>

                    <div className="form-floating mb-3 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputCelContacto"
                        placeholder="Cel contacto"
                        name="celContacto"
                        value={supplierForm.celContacto}
                        onChange={onChange}
                      />
                      <label htmlFor="floatingInputCelContacto" className="h6">ej: 223123456</label>
                      {errors.celContacto &&
                        <p className="text-danger">{errors.celContacto}</p>
                      }
                    </div>
                  </div>



                </form>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}