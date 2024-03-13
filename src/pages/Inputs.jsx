import { useContext } from "react"
import { useCorredera } from "../hooks/inputs/useCorredera"
import { Seeker } from "../components/Seeker"
import { CorrederaCard } from "../components/CorrederaCard"
import { ElasticoCard } from "../components/ElasticoCard";
import { NewInputModal } from "../components/NewInputModal";
import { useInputModal } from "../hooks/inputs/useInputModal";
import { useElastico } from "../hooks/inputs/useElastico";
import { ElasticosContext } from "../context/ElasticosContext";
import { ArgollaCard } from "../components/ArgollaCard";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { useArgolla } from "../hooks/inputs/useArgolla";
import { ArgollaContext } from "../context/ArgollaContext";
import { GanchosContext } from "../context/GanchosContext";
import { GanchoCard } from "../components/GanchoCard";
import { useGancho } from "../hooks/inputs/useGancho";
import { useEtiqueta } from "../hooks/inputs/useEtiqueta";
import { AccordionItem } from "../components/bootstrapComponents/AccordionItem";
import { EtiquetaCard } from "../components/EtiquetaCard";
import { useAplique } from "../hooks/inputs/useAplique";
import { ApliqueCard } from "../components/ApliqueCard";

export const Inputs = () => {

  const { correderas,
    findAllCorrederas,
    updateCorredera,
    onDeleteCorredera } = useCorredera();

  const { inputModalIsOpen,
    toggle,
    selectedModal,
    inputDbHasChanged } = useInputModal();

  const { findAllElasticos } = useElastico();

  const { elasticos } = useContext(ElasticosContext);

  const { argollas } = useContext(ArgollaContext);

  const { findAllArgollas } = useArgolla();

  // const { ganchos } = useContext(GanchosContext)

  const { ganchos, findAllGanchos } = useGancho();

  const { etiquetas, findAllEtiquetas } = useEtiqueta();

  const { apliques, findAllApliques } = useAplique();


  const fillCorrederasDb = () => {
    if (correderas.length === 0) {
      findAllCorrederas();
    }
  }

  const fillElasticosDb = () => {
    if (elasticos.length === 0) {
      findAllElasticos();
    }
  }

  const fillArgollasDb = () => {
    if (argollas.length === 0) {
      findAllArgollas()
    }
  }

  const fillGanchosDb = () => {
    if (argollas.length === 0) {
      findAllGanchos()
    }
  }

  const fillEtiquetasDb = () => {
    if (etiquetas.length === 0) {
      findAllEtiquetas()
    }
  }
  const fillApliquesDb = () => {
    if (apliques.length === 0) {
      findAllApliques()
    }
  }


  return (
    <>

      {
        inputDbHasChanged &&
        <FetchTopAlert
          text={inputDbHasChanged}
        />
      }

      {inputModalIsOpen && (selectedModal === "corredera" || selectedModal === "elastico" ||
        selectedModal === "argolla" || selectedModal === "" || selectedModal === "gancho" ||
        selectedModal === "etiqueta" || selectedModal === "aplique") &&
        <NewInputModal />
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
                  elasticos && elasticos.map(el => (
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
                onClick={fillArgollasDb}
              >
                Argollas
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body row">

                {
                  argollas &&
                  argollas.map(arr => (
                    <ArgollaCard
                      key={arr.id}
                      argolla={arr}
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
                data-bs-target="#panelsStayOpen-collapseTalleres"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTalleres"
                onClick={fillGanchosDb}
              >
                Ganchos
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTalleres" className="accordion-collapse collapse">
              <div className="accordion-body row">

                {

                  ganchos &&
                  ganchos.map(gancho => (
                    <GanchoCard
                      key={gancho.id}
                      gancho={gancho}
                    />
                  ))
                }

              </div>
            </div>
          </div>

          <AccordionItem
            titulo="Etiquetas"
            id="etiquetas"
            onClick={fillEtiquetasDb}
          >
            <div className="row">
              {
                etiquetas &&
                etiquetas.map(etiqueta => (
                  <EtiquetaCard
                    etiqueta={etiqueta}
                    key={etiqueta.id}
                  />
                ))
              }
            </div>
          </AccordionItem>

          <AccordionItem
            titulo="Apliques"
            id="apliques"
            onClick={fillApliquesDb}
          >
            <div className="row">
              {
                apliques &&
                apliques.map(aplique => (
                  <ApliqueCard
                    key={aplique.id}
                    aplique={aplique}
                  />
                ))
              }
            </div>
          </AccordionItem>
        </div >
      </div >


    </>
  )
}