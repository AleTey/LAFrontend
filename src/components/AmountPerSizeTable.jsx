import { useEffect } from "react"

export const AmountPerSizeTable = ({ amount, editMode, onSheetChange, color = 'success', empty }) => {

  // useEffect(() => {
  //   console.log(amount)
  // }, [])

  return (
    <>

      <div className=" container d-flex row border">
        <div className="d-flex row gap-2 col justify-content-center">
          <div className="container d-flex justify-content-center">
            <b>{amount.productForLoteDTO.nombre}</b>
          </div>
          <div className="container d-flex justify-content-center">
            <img src={amount.productForLoteDTO.urlFile} alt={amount.productForLoteDTO.nombre} style={{ maxWidth: "10rem", minWidth: "10rem" }} />
          </div>
        </div>
        <div className="container col">

          <table className={`table table-${color}`}>
            <thead>
              <tr>
                <th>Talle</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>

              {
                empty && empty === true ?

                  Object.entries(amount.amountPerSize).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <th>
                        {!editMode ? "" :
                          <input className="form-control"
                            name={key}
                            value=""
                            type="text"
                            style={{ maxWidth: "6rem" }}
                            onChange={(e) => onSheetChange(e, amount.id)}
                          />
                        }
                      </th>
                    </tr>
                  ))
                  :
                  Object.entries(amount.amountPerSize).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <th>
                        {!editMode ? value :
                          <input className="form-control"
                            name={key}
                            value={999}
                            type="number"
                            min="0"
                            style={{ maxWidth: "6rem" }}
                            onChange={(e) => onSheetChange(e, amount.id)}
                          />
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