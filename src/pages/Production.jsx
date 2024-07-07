import { useContext, useState } from "react"
import { LoteContext } from "../context/LoteContext";
import { LoteCard } from "../components/LoteCard";
import { NewLoteModal } from "../components/NewLoteModal";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { useLote } from "../hooks/lotes/useLote"

export const Production = () => {

  const [newLoteIsOpen, setNewLoteIsOpen] = useState(false);

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


  const onClickSectionLote = (state) => {
    getLotesByState(state);
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
          // modalIsOpen={setNewLoteIsOpen}
          // setNewLoteIsOpen={setNewLoteIsOpen}
        />

      }

      <div className="container">
        <h2 className="my-3"> Producción  </h2>
        <hr />

        <div className="container mb-3 d-flex column gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setNewLoteFormIsOpen(true)}
          >
            Nuevo lote
          </button>
        </div>

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
                onClick={() => onClickSectionLote('COLA')}
              >
                Cola corte
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
                Corte
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
                Preparación de corte
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
                Talleres
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
                Control
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
                  <LoteCard key={lote.id} lote={lote} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}