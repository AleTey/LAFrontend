export const Spinner = () => {

  return (
    <>
      <div className="container position-absolute top-50 start-50 translate-middle d-flex justify-content-center" style={{ width: "100vw" }}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  )
}