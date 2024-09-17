import { useContext, useState } from "react"
import { LoteContext } from "../context/LoteContext";
import { LoteCard } from "../components/LoteCard";
import { NewLoteModal } from "../components/NewLoteModal";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { useLote } from "../hooks/lotes/useLote"
import { hasAnyRole } from "../auth/utils/hasAnyRole";
import { AuthContext } from "../auth/context/AuthContext.Jsx";

export const Production = () => {

  const [newLoteIsOpen, setNewLoteIsOpen] = useState(false);

  const [stateSelected, setStateSelected] = useState("");

  const { lotesQueue,
    lotesPreparation,
    lotesCut,
    lotesWorkshop,
    lotesControl,
    lotesFinalizado,
    getLotesByState,
    loteDbHasChanged,
    newLoteFormIsOpen,
    setNewLoteFormIsOpen
  } = useLote();

  const { login } = useContext(AuthContext);

  const onClickSectionLote = (state) => {
    getLotesByState(state);
  }

  const stateSelectedHandler = (state) => {
    setStateSelected(state)
    onClickSectionLote(state)
  }

  return (

    <>
      {
        loteDbHasChanged &&
        <FetchTopAlert
          text={loteDbHasChanged}
        />
      }
      {
        newLoteFormIsOpen &&
        <NewLoteModal
        />

      }

      <div className="container">
        <h2 className="my-3"> Producción  </h2>
        <hr />

        {

          hasAnyRole(login.user.authorities, ["CREATE_LOTE"]) &&
          <div className="container mb-3 d-flex column gap-2">
            <button
              className="btn btn-success"
              onClick={() => setNewLoteFormIsOpen(true)}
            >
              Nuevo lote
            </button>
          </div>
        }

        {/* <div className="container d-flex gap-2 mb-3"> */}
        <div className="container" >


          <button className={stateSelected === "COLA" ? "btn btn-outline-primary me-2 mb-2" : "btn btn-outline-secondary me-2 mb-2"} onClick={() => stateSelectedHandler("COLA")}>
            En cola
          </button>

          <button className={stateSelected === "CORTE" ? "btn btn-outline-primary me-2 mb-2" : "btn btn-outline-secondary me-2 mb-2"} onClick={() => stateSelectedHandler("CORTE")}>
            En corte
          </button>

          <button className={stateSelected === "PREPARADO" ? "btn btn-outline-primary me-2 mb-2" : "btn btn-outline-secondary me-2 mb-2"} onClick={() => stateSelectedHandler("PREPARADO")}>
            En preparación
          </button>

          <button className={stateSelected === "TALLER" ? "btn btn-outline-primary me-2 mb-2" : "btn btn-outline-secondary me-2 mb-2"} onClick={() => stateSelectedHandler("TALLER")}>
            En talleres
          </button>

          <button className={stateSelected === "CONTROL" ? "btn btn-outline-primary me-2 mb-2" : "btn btn-outline-secondary me-2 mb-2"} onClick={() => stateSelectedHandler("CONTROL")}>
            En control
          </button>

          <button className={stateSelected === "FINALIZADO" ? "btn btn-outline-primary me-2 mb-2" : "btn btn-outline-secondary me-2 mb-2"} onClick={() => stateSelectedHandler("FINALIZADO")}>
            Finalizados
          </button>


        </div>

      </div>
      <div className="container">



        {
          stateSelected === "COLA" && lotesQueue && lotesQueue.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }

        {
          stateSelected === "CORTE" && lotesCut && lotesCut.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }
        {
          stateSelected === "PREPARADO" && lotesPreparation && lotesPreparation.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }
        {
          stateSelected === "TALLER" && lotesWorkshop && lotesWorkshop.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }
        {
          stateSelected === "CONTROL" && lotesControl && lotesControl.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }
        {
          stateSelected === "FINALIZADO" && lotesFinalizado && lotesFinalizado.map(lote => (
            <LoteCard
              key={lote.id}
              lote={lote}
            />
          ))
        }

      </div>

      {/* <div className="accordion" id="accordionPanelsStayOpenExample">

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseOne"
                onClick={() => onClickSectionLote('COLA')}
              >
                En cola corte
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
              <div className="accordion-body">
                {
                  lotesQueue && lotesQueue.map(lote => (
                    <LoteCard
                      key={lote.id}
                      lote={lote}
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
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
                onClick={() => onClickSectionLote('CORTE')}
              >
                En corte
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body">
                {
                  lotesCut && lotesCut.map(lote => (
                    <LoteCard
                      key={lote.id}
                      lote={lote}
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
                onClick={() => onClickSectionLote('PREPARADO')}
              >
                En preparación
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body">
                {
                  lotesPreparation && lotesPreparation.map(lote => (
                    <LoteCard
                      key={lote.id}
                      lote={lote}
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
                onClick={() => onClickSectionLote('TALLER')}
              >
                En talleres
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTalleres" className="accordion-collapse collapse">
              <div className="accordion-body">
                {
                  lotesWorkshop && lotesWorkshop.map(lote => (
                    <LoteCard
                      key={lote.id}
                      lote={lote}
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
                data-bs-target="#panelsStayOpen-collapseControl"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseControl"
                onClick={() => onClickSectionLote('CONTROL')}
              >
                En control
              </button>
            </h2>
            <div id="panelsStayOpen-collapseControl" className="accordion-collapse collapse">
              <div className="accordion-body">
                {lotesControl && lotesControl.map(lote => (
                  <LoteCard key={lote.id} lote={lote} />
                ))}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseFinalizado"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFinalizado"
                onClick={() => onClickSectionLote('FINALIZADO')}
              >
                Finalizados
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFinalizado" className="accordion-collapse collapse">
              <div className="accordion-body">
                {lotesFinalizado && lotesFinalizado.map(lote => (
                  <LoteCard
                    key={lote.id}
                    lote={lote}
                  />
                ))}
              </div>
            </div>
          </div>

        </div> */}

    </>
  )
}