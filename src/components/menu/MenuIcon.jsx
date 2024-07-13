
import '../../acss/menu.css'

export const MenuIcon = ({ img, text, color = "white" }) => {

  return (
    <>
      {/* <div className="container" style={{height: "30px;"}}> */}
      {/* <div className="container d-flex justify-content-center"> */}
      <div className="card text-bg-dark container-img">        
          <img src={img} className="custom-image" alt="..." />        
        <div className="card-img-overlay">
          <h2 className={`${color}`}>{text}</h2>
        </div>
      </div>
    </>
  )
}