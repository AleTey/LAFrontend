import { useEffect } from "react"
import { FabricCard } from "../components/FabricCard"
import { Seeker } from "../components/Seeker";
import { NewFabricModal } from "../components/NewFabricModal";
import { useFabric } from "../hooks/useFabric";


export const Fabric = () => {

  const {
    fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabrics,
    getAllFabricsPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
  } = useFabric();


  useEffect(() => {
    getAllFabrics();
  }, [])



  return (
    <>
      {
        fabricWasAdded &&
        <div className="alert alert-success fixed-top my-5" role="alert">
          Una nueva tela fue agregada
        </div>
      }
      {
        fabricWasEdited &&
        <div className="alert alert-success fixed-top my-5" role="alert">
          Una nueva tela fue editada
        </div>
      }
      {
        fabricWasDeleted &&
        <div className="alert alert-success fixed-top my-5" role="alert">
          Tela fue eliminada
        </div>
      }
      <div className="container-sm">
        {fabricModalIsOpen && <NewFabricModal
          setFabricModalIsOpen={setFabricModalIsOpen}
          // fabrics={fabrics}
          addNewFabric={addNewFabric}
        />}

        <h2 className="my-3"> Telas  </h2>
        <hr />
        <button type="button" className="btn btn-outline-primary" onClick={onNewFabric}>
          Nueva tela
        </button>
        <Seeker />

        <section className="container row">
          {
            fabrics.map(fabric => (
              <FabricCard
                key={fabric.id}
                fabric={fabric}
                editFabric={editFabric}
                onDeleteFabric={onDeleteFabric}
              />
            ))
          }
        </section>
      </div>
    </>
  )
}