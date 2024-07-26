export const ImageModal = ({ image, title, text = "", modalIsOpen }) => {


  return (
    <>
      <div className="modal fade show" style={{ maxWidth: "80rem", display: "block" }} tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { modalIsOpen(false) }}></button>
            </div>
            <div className="modal-body">
              <img src={image} alt="" />
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}