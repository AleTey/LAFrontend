import { useEffect, useState } from "react"
import { useCorredera } from "../hooks/inputs/useCorredera"
import { Seeker } from "../components/Seeker"
import { CorrederaCard } from "../components/CorrederaCard"
import { ElasticoCard } from "../components/ElasticoCard";
import { NewInputModal } from "../components/NewInputModal";
import { useInputModal } from "../hooks/inputs/useInputModal";

export const Inputs = () => {

  const [correderasDb, setCorrederasDb] = useState([]);

  const [elasticosDb, setElasticosDb] = useState([]);

  const { correderas,
    correderaFormIsActive,
    setCorrederaFormIsActive,
    findAllCorrederas,
    addNewCorredera,
    updateCorredera,
    onDeleteCorredera } = useCorredera();

  const { inputModalIsOpen,
    toggle,
    selectedModal,
    modalSelectionHandler,
    correderaWasAdded,
    correderaWasDeleted } = useInputModal();




  const fillCorrederasDb = () => {
    if (correderas.length === 0) {
      findAllCorrederas();
    }
  }

  const fillElasticosDb = () => {
    const findAllElasticos = async () => {
      const getElasticos = await fetch("http://localhost:8080/elasticos")
      if (getElasticos.ok) {
        const elasticosJson = await getElasticos.json();
        setElasticosDb(elasticosJson);
      }
    }
    if (elasticosDb.length === 0) {
      findAllElasticos();
    }
  }


  return (
    <>
      {correderaWasAdded &&
        <div className="alert alert-success fixed-top my-5" role="alert">
          Corredera agregada con exito!
        </div>
      }

      {
        correderaWasDeleted &&
        <div className="alert alert-success fixed-top my-5" role="alert">
          Corredera eliminada con exito!
        </div>
      }



      {inputModalIsOpen && selectedModal === "" &&
        <NewInputModal
          addNewCorredera={addNewCorredera}
          updateCorredera={updateCorredera}
        />
      }

      <div className="container">
        <h2 className="my-3"> Insumos  </h2>
        <hr />
        <button className="btn btn-outline-primary" onClick={toggle}>Nuevo Insumo</button>
        <Seeker />

        <div className="accordion" id="accordionPanelsStayOpenExample">

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseOne"
                onClick={fillCorrederasDb}
              >
                Correderas
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" >
              <div className="accordion-body">
                <div className="g-flex row">

                  {
                    correderas && correderas.map(corredera => (
                      <CorrederaCard
                        key={corredera.id}
                        corredera={corredera}
                        onDeleteCorredera={onDeleteCorredera}
                        updateCorredera={updateCorredera}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
                onClick={fillElasticosDb}
              >
                Elásticos
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body row">
                {
                  elasticosDb && elasticosDb.map(el => (
                    <ElasticoCard
                      key={el.id}
                      elastico={el}
                    />
                  ))
                }
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
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

        {/* {
        correderasDb.map(corredera => (
          <CorrederaCard
            key={corredera.id}
            corredera={corredera}
          />
        ))
      } */}


        {/* <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}

      </div>


    </>
  )
}