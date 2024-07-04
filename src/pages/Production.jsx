import { useContext, useEffect, useState } from "react"
import { FabricCutQueue } from "../components/FabricCutQueue"
import { LoteContext } from "../context/LoteContext";
import { LoteCard } from "../components/LoteCard";
import { NewLoteModal } from "../components/NewLoteModal";

export const Production = () => {

  const [newLoteIsOpen, setNewLoteIsOpen] = useState(false);
  const [queueLotes, setQueueLotes] = useState([]);
  const {
    lotesQueue,
    dispatchAllQueueLotes,
    lotesPreparation,
    dispatchAllPreparationLotes,
    lotesCut,
    dispatchAllCutLotes,
    lotesWorkshop,
    dispatchAllWorkshopLotes,
    lotesControl,
    dispatchAllControlLotes,
    lotesFinalizado,
    dispatchAllFinalizadoLotes
  } = useContext(LoteContext);


  const onClickSectionLote = (state) => {
    const getLotesByState = async (state) => {
      const lotes = await fetch(`http://localhost:8080/lotes/by-state/${state}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (lotes.ok) {
        const lotesJson = await lotes.json();

        switch (state) {
          case "COLA":
            dispatchAllQueueLotes(loteWithImgMapper(lotesJson));
            break;
          case "CORTE":
            dispatchAllCutLotes(loteWithImgMapper(lotesJson));
            break;
          case "PREPARADO":
            dispatchAllPreparationLotes(loteWithImgMapper(lotesJson));
            break;
          case "TALLER":
            dispatchAllWorkshopLotes(loteWithImgMapper(lotesJson));
            break;
          case "CONTROL":
            dispatchAllControlLotes(loteWithImgMapper(lotesJson));
            break;
          case "FINALIZADO":
            dispatchAllFinalizadoLotes(loteWithImgMapper(lotesJson));
            break;
          default:
            break;
        }
      }
    }
    getLotesByState(state);
  }

  const loteWithImgMapper = (lotes) => {
    return lotes.map(lote => ({
      ...lote,
      productsForLoteDTO: lote.productsForLoteDTO.map(producto => ({
        ...producto,
        img: `data:image/jpeg;base64,${producto.img}`
      }))
    }));
  }


  return (

    <>
      {
        newLoteIsOpen &&
        <NewLoteModal
          modalIsOpen={setNewLoteIsOpen}
        />

      }

      <div className="container">
        <h2 className="my-3"> Producción  </h2>
        <hr />

        <div className="container mb-3 d-flex column gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setNewLoteIsOpen(true)}
          >
            Nuevo lote
          </button>
          {/* <button className="btn btn-primary">
            Tiras
          </button>
          <button className="btn btn-primary">
            Muestra/Especial
          </button> */}
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
                {/* <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
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
                {/* <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
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
                {/* <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
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
          {/* 
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
                {
                  lotesControl && lotesControl.map(lote => (
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
          </div> */}

          {/* <div className="accordion-item">
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
            <div id="panelsStayOpen-collapseFinalizado"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                {
                  lotesFinalizado && lotesFinalizado.map(lote => (
                    <LoteCard
                      key={lote.id}
                      lote={lote}
                    />
                  ))
                }
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </>
  )
}