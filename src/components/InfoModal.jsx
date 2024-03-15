export const InfoModal = ({ children, title, closeModal }) => {

  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}></button>
            </div>
            <div className="modal-body">

              <div className="container">

                {children}

              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}