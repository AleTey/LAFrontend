export const SelectStrings = ({ defaultValue, name, onChangeMethod, initialValueText, array }) => {

  return (
    <>
      <select
        defaultValue={defaultValue}
        name={name}
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={onChangeMethod}
      >
        <option value={defaultValue}>{initialValueText}</option>
        {
          array.map(item => {
            if (item !== initialValueText) {

              return <option key={item} value={item}>{item}</option>
            }
          })
        }
        {/* {
          array.map(item => (

            <option key={item} value={item}>{item}</option>
          ))
        } */}
      </select>
    </>
  )
}