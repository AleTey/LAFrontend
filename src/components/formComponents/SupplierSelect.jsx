export const SupplierSelect = ({ inputForm, suppliers, onChangeInputForm }) => {

  return (
    <>

      {
        inputForm.id && inputForm.proveedor && inputForm.proveedor.id ?


          <select
            defaultValue={inputForm.proveedor ? inputForm.proveedor.id : undefined}
            name="proveedor"
            className="form-select form-select-lg mb-3"
            aria-label="Large select example"
            onChange={onChangeInputForm}
          >
            <option value={inputForm.proveedor.id || ""}>{inputForm.proveedor && inputForm.proveedor.empresa}</option>
            {
              suppliers.map(sup => {
                if (sup.id !== inputForm.proveedor.id) {
                  return <option key={sup.id} value={sup.id}>{sup.empresa}</option>
                }
              })
            }
          </select>

          :

          <select
            defaultValue="Proveedor"
            name="proveedor"
            className="form-select form-select-lg mb-3"
            aria-label="Large select example"
            onChange={onChangeInputForm}
          >
            <option value="Proveedor">Seleccionar proveedor</option>
            {
              suppliers.map(sup => (

                <option key={sup.id} value={sup.id}>{sup.empresa}</option>
              ))
            }
          </select>

      }
    </>
  )
}