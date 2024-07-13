import { useState } from "react";

export const WarehouseCard = ({ warehouse, onUpdateWarehouseList }) => {

  const [warehouseForm, setWarehouseForm] = useState(warehouse);

  const [formHasChanged, setFormHasChanged] = useState(false);

  const onChangeAmounts = (e) => {
    const { name, value } = e.target;
    setWarehouseForm({
      ...warehouseForm,
      amountPerSize: {
        ...warehouseForm.amountPerSize,
        [name]: value
      }
    })
    if (!formHasChanged) {
      setFormHasChanged(true);
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;

    setWarehouseForm({
      ...warehouseForm,
      [name]: value
    })

    if (!formHasChanged) {
      setFormHasChanged(true)
    }
  }

  const onDeleteChanges = () => {
    setWarehouseForm(warehouse);
    setFormHasChanged(false);
  }



  const onSubmit = () => {

    const updateWarehouse = async (warehouseForm) => {
      const res = await fetch(`http://localhost:8080/warehouse`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...warehouseForm,
          product: {
            id: warehouseForm.product.id
          }
        })
      })

      if (res.ok) {
        const resJson = await res.json();
        onUpdateWarehouseList(warehouseForm)
        setFormHasChanged(false);
        console.log(formHasChanged)
        console.log(resJson);
      }
    }

    updateWarehouse(warehouseForm);
  }


  return (
    <>
      <div className="container d-flex justify-content-center column" style={{maxWidth: "50rem"}}>
        <div className="card mb-3">
          <div className="row ">
            <div className="col-md-4">
              {
                warehouse.product.img &&
                <img src={warehouse.product.img} className="img-fluid rounded-start" alt="..." />
              }
            </div>
            <div className="col-md-6">
              <div className="card-body d-flex column">
                <div>
                  <h5 className="card-title">{warehouse.product.nombre}</h5>
                  <p className="card-text">{warehouse.product.modelAndStripsForProduct.model.tipoPrenda}</p>
                </div>
                <div className="container d-flex row gap-2">
                  {
                    Object.entries(warehouseForm.amountPerSize).map(([key, value]) => (
                      <div key={key} className="container d-flex column gap-2 align-middle">
                        <p className="align-middle"><b>{key}</b>:</p>
                        <input className="form-control" type="number" name={key} value={value} style={{ maxWidth: "8rem" }} onChange={onChangeAmounts} />
                      </div>

                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="container d-flex column justify-content-around mt-3">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="section" name="section" value={warehouseForm.section} onChange={onChange} />
              <label htmlFor="section">Sección</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="location" name="location" value={warehouseForm.location} onChange={onChange} />
              <label htmlFor="location">Ubicación</label>
            </div>
          </div>

          <hr />

          <div className="container d-flex column mb-3 gap-3">
            <button className="btn btn-primary" style={{ minWidth: "4rem" }} disabled={!formHasChanged} onClick={onSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
              </svg>
            </button>
            <button className="btn btn-danger" disabled={!formHasChanged} onClick={onDeleteChanges}>
              Deshacer cambios
            </button>
          </div>

        </div >
      </div>
    </>
  )
}