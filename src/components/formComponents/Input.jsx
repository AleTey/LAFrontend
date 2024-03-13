export const Input = ({ name, value, placeHolder, onChangeInput, type }) => {
  
  return (
    <>
      <div className="form-floating mb-3">
        <input
          name={name}
          value={value}
          type={type}
          className="form-control required"
          placeholder={placeHolder}
          onChange={onChangeInput}
        />
        <label>{placeHolder}</label>
      </div>
    </>
  )
}