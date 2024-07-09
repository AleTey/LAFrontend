export const InputQuantityTable = ({ inputQuantityForSpreadsheet }) => {

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <td><b>Id</b></td>
            <td><b>Nombre</b></td>
            <td><b>Cant.</b>.</td>
          </tr>
        </thead>
        <tbody>
          {
            inputQuantityForSpreadsheet && inputQuantityForSpreadsheet.map(input => (
              <tr key={input.id}>
                <td>{input.input.id}</td>
                <td>{input.input.nombre}</td>
                <td>{input.quantity}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}