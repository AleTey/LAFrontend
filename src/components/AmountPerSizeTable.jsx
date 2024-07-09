import { useEffect } from "react"

export const AmountPerSizeTable = ({ amount, editMode, onSheetChange }) => {

  useEffect(() => {
    console.log(amount)
  }, [])

  return (
    <>

      <div className=" container d-flex row border">
        <div className="d-flex row gap-2 col justify-content-center">
          <div className="container d-flex justify-content-center">
            <b>{amount.productForLoteDTO.nombre}</b>
          </div>
          <div className="container d-flex justify-content-center">
            <img src={amount.productForLoteDTO.img} alt={amount.productForLoteDTO.nombre} style={{ maxWidth: "10rem", minWidth: "10rem" }} />
          </div>
        </div>
        <div className="container col">

          <table className="table table-success">
            <thead>
              <tr>
                <th>Talle</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>

              {

                Object.entries(amount.amountPerSize).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <th>
                      {!editMode ? value :
                        <input className="form-control"
                          name={key}
                          value={value}
                          type="number"
                          style={{ maxWidth: "6rem" }}
                          onChange={(e) => onSheetChange(e, amount.id)} />
                      }
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </div>

    </>
  )
}