
export const ModelsCard = ({
  modelo,
  tipoPrenda,
  temporada,
  tags,
  img
}) => {


  


  return (
    <>
      <div className="card" style={{ width: " 18rem" }}>

      {/* {img ?
          <img src={img} className="card-img-top" alt={modelo} />
          :
          <img src="src/db/imgs/image-not-found.jpg" className="card-img-top" alt={modelo} />
        } */}

        

        <div className="card-body">
          <h5 className="card-title">{modelo} / {tipoPrenda}</h5>
          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">temporada: {temporada}</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    </>
  )
}