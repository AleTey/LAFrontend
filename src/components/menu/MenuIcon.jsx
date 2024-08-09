
import '../../acss/menu.css'

export const MenuIcon = ({ img, text, color = "white" }) => {

  return (
    <>
      <div className="card text-bg-dark container-img">
        <img src={img} className="custom-image" alt="..." />
        {/* <div className="card-img-overlay">
        </div> */}
      </div>
        <h4 className={`${color} text-center`}>{text}</h4>
    </>
  )
}