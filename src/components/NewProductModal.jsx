import { useState } from "react";
import { Input } from "./formComponents/Input"
import { InfoModal } from "./InfoModal";
import { FabricSelectorOfProductModal } from "./FabricSelectorOfProductModal";

const productFormInitialState = {
  nombre: "",
  colorForro: "",
  fabric: {
    id: 0
  },
  modelAndStripsForProduct: {
    model: {
      id: 0
    },
    stripDetailsForProduct: []
  },
  img: null
}
export const NewProductModal = ({ setProductFormIsOpen, productData = productFormInitialState }) => {

  const [productForm, setProductForm] = useState(productData);

  const [pickFabricIsOpen, setPickFabricIsOpen] = useState(false);

  const onChangeForm = (e) => {
    const { name, value } = e.target;

    if (name === "nombre" || name === "colorForro") {
      setProductForm({
        ...productForm,
        [name]: value
      })
    }


  }

  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nuevo Producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setProductFormIsOpen(false)}></button>
            </div>
            <div className="modal-body">

              <div className="container">

                <form action="" >

                  <Input
                    name={"nombre"}
                    placeHolder={"Nombre nuevo producto"}
                    value={productForm.nombre}
                    type="text"
                    onChangeInput={onChangeForm}
                  />
                  <Input
                    name={"colorForro"}
                    placeHolder={"Color del forro"}
                    value={productForm.colorForro}
                    type="text"
                    onChangeInput={onChangeForm}
                  />

                  <h5>Tela</h5>
                  <button
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPickFabricIsOpen(true)
                    }}>
                    Seleccionar tela
                  </button>
                  {
                    pickFabricIsOpen &&
                    <FabricSelectorOfProductModal
                      closeModal={setPickFabricIsOpen}
                    />
                  }


                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}