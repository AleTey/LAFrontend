export const ImageModal = ({ image, title, text = "", modalIsOpen }) => {


  return (
    <>
      <div class="modal fade show" style={{ maxWidth: "80rem", display: "block" }} tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { modalIsOpen(false) }}></button>
            </div>
            <div class="modal-body">
              <img src={image} alt="" />
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}