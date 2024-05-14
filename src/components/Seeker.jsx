import { useState } from "react"

export const Seeker = ({ onClickSearch }) => {

  const [inputContent, setInputContent] = useState("");

  const onChange = (e) => {
    setInputContent(
      e.target.value
    )
  }

  return (
    <>

      <section className="my-3">
        <div className="container row w-74 justify-content-center">
          <input type="text" className="input-group-text mx-2 col-1 col-sm-1 col-md-4 text-start" name="" value={inputContent} onChange={onChange} />
          <div className=" col-md-2">
            <button className="btn btn-primary btn-xs" onClick={(e) => { e.preventDefault(), onClickSearch(inputContent) }}>Buscar</button>
          </div>
        </div>
      </section>

    </>
  )
}