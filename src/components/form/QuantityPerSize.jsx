import { useEffect, useState } from "react"

const quantityPerSizeInitialState = {
  s: "",
  m: "",
  l: "",
  xl: "",
  xxl: "",
  xxxl: "",
}

export const QuantityPerSize = ({ OnChangeQuantity, typeE }) => {

  const [quantityPerSize, setQuantityPerSize] = useState(quantityPerSizeInitialState);



  const onQuantityChange = async ({ target }) => {
    const { name, value } = target;

    setQuantityPerSize({
      ...quantityPerSize,
      [name]: value
    })
  }

  useEffect(() => {
    OnChangeQuantity(typeE, quantityPerSize);

  }, [quantityPerSize])


  return (
    <>
      <div className="container">
        Cantidad necesaria por talle en cm
        <div className="row">
          <div className="input-group input-group-sm mb-3 col">
            <span className="input-group-text" id="inputGroup-sizing-sm">S</span>
            <input
              name="s"
              value={quantityPerSize.s}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={onQuantityChange}
            />
          </div>

          <div className="input-group input-group-sm mb-3 col">
            <span className="input-group-text" id="inputGroup-sizing-sm">M</span>
            <input
              name="m"
              value={quantityPerSize.m}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={onQuantityChange}
            />
          </div>

          <div className="input-group input-group-sm mb-3 col">
            <span className="input-group-text" id="inputGroup-sizing-sm">L</span>
            <input
              name="l"
              value={quantityPerSize.l}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={onQuantityChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="input-group input-group-sm mb-3 col">
            <span className="input-group-text" id="inputGroup-sizing-sm">XL</span>
            <input
              name="xl"
              value={quantityPerSize.xl}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={onQuantityChange}
            />
          </div>

          <div className="input-group input-group-sm mb-3 col">
            <span className="input-group-text" id="inputGroup-sizing-sm">XXL</span>
            <input
              name="xxl"
              value={quantityPerSize.xxl}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={onQuantityChange}
            />
          </div>

          <div className="input-group input-group-sm mb-3 col">
            <span className="input-group-text" id="inputGroup-sizing-sm">XXXL</span>
            <input
              name="xxxl"
              value={quantityPerSize.xxxl}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={onQuantityChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}