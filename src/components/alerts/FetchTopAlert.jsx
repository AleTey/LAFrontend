export const FetchTopAlert = ({ text }) => {

  return (
    <>
      <div className="alert alert-success fixed-top my-5" role="alert">
        {text}
      </div>
    </>
  )
}