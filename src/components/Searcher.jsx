import { useEffect, useRef, useState } from "react";

export const Searcher = ({ onClickSearch }) => {

  const [inputContent, setInputContent] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [])

  const onChange = (e) => {
    setInputContent(
      e.target.value
    )
  }

  const handleKeyDow = (e) => {
    if (e.key === 'Enter') {
      onClickSearch(inputContent);
    }
  }

  return (
    <>

      <section className="my-3">
        <div className="container d-flex row 4 justify-content-center gap-2">
          <input type="text" className="form-control" style={{ maxWidth: "10rem" }} name="" value={inputContent} onChange={onChange} onKeyDown={handleKeyDow} ref={inputRef} />
          {/* <div className=" col-md-2"> */}
          <button className="btn btn-primary btn-xs" style={{ maxWidth: "2.5rem" }} onClick={() => onClickSearch(inputContent)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
          {/* </div> */}
        </div>
      </section>

    </>
  )
}