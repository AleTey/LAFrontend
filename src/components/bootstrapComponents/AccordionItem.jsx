export const AccordionItem = ({ titulo, id, children, onClick }) => {

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading${id}`}>
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={id} onClick={onClick}>
            {titulo}
          </button>
        </h2>
        <div id={id} className="accordion-collapse collapse" aria-labelledby={`heading${id}`} data-bs-parent="#accordionExample">
          <div className="accordion-body">
            {children}

          </div>
        </div>
      </div>
    </>
  )
}