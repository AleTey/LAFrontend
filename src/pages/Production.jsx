import { useEffect } from "react"
import { FabricCutQueue } from "../components/FabricCutQueue"

export const Production = () => {


  // useEffect(() => {
  //   const findLote = async () => {
  //     const response = await fetch('http://localhost:8080/lotes/1', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Otros headers que puedas necesitar
  //       }
  //     });
  //     console.log("fetching")
  //     console.log(response)
  //     if (response.ok) {
  //       const loteJson = await response.json();
  //       console.log(loteJson)
  //     }
  //   }
  //   findLote();
  // }, [])

  return (

    <>
      <div className="container">
        <h2 className="my-3"> Producción  </h2>
        <hr />

        Mostrar lista de productos en producción con su estado

        <div className="accordion" id="accordionPanelsStayOpenExample">

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                Cola corte
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
              <div className="accordion-body">
                <FabricCutQueue />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Corte
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Preparación de corte
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTalleres" aria-expanded="false" aria-controls="panelsStayOpen-collapseTalleres">
                Talleres
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTalleres" className="accordion-collapse collapse">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseControl" aria-expanded="false" aria-controls="panelsStayOpen-collapseControl">
                Control
              </button>
            </h2>
            <div id="panelsStayOpen-collapseControl" className="accordion-collapse collapse">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}