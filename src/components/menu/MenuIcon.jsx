
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
            {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
            {/* <p className="card-text"><small>Last updated 3 mins ago</small></p> */}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}