export const Modal = ({ children, isOpen, title }) => {

  return (
    <>
      <div className="modal fade show" style={{ maxWidth: "80rem", display: "block" }} tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { isOpen(false) }}></button>
            </div>
            <div className="modal-body" style={{ objectFit: "cover" }}>
              {children}
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}