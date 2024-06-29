export const ImgSelector = ({ onChangeFunction }) => {


  return (
    <>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label h6 mt-3">Seleccionar imagen</label>
        <input
          className="form-control mt-1"
          type="file"
          id="formFile"
          name="img"
          // value={fabricForm.img}
          onChange={onChangeFunction}
        />
      </div>
    </>
  )
}