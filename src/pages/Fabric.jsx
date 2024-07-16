import { useState, useEffect } from "react"
import { FabricCard } from "../components/FabricCard"
import { Seeker } from "../components/Seeker";
import { NewFabricModal } from "../components/NewFabricModal";
import { useFabric } from "../hooks/useFabric";
import { Paginator } from "../components/Paginator";
import { useParams } from "react-router-dom";
import { Searcher } from "../components/Searcher";


export const Fabric = () => {

  const { page } = useParams();

  const [elementsFounded, setElementsFounded] = useState();

  const [searchIsActive, setSearchIsActive] = useState(false);

  const [stringToSearch, setStringToSearch] = useState("")

  const {
    fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    paginator,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabricsPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString,
  } = useFabric();


  useEffect(() => {
    if (searchIsActive) {
      searchFabricByString(stringToSearch, page);
    } else {
      getAllFabricsPages(page);
    }
  }, [, page])



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

        <Searcher
          onClickSearch={searchFabricByString}
          pageNumber={page}
          path='fabric'
          setSearchIsActive={setSearchIsActive}
          setStringToSearch={setStringToSearch}
        />

        <section className="container row">
          {
            fabrics.length > 0 ?
              fabrics.map(fabric => (
                <FabricCard
                  key={fabric.id}
                  editFabric={editFabric}
                  onDeleteFabric={onDeleteFabric}
                  fabric={fabric}
                />
              ))
              :
              <h6>No se han encontrado resultados para tu búsqueda</h6>

          }
        </section>

        {
          searchIsActive &&
          <h6 className="mt-3">{paginator.numberOfElements}/{paginator.totalElements} Telas encontrados</h6>
        }
        {/* {

            elementsFounded ?
              elementsFounded.map(fabric => (
                <FabricCard
                  key={fabric.id}
                  fabric={fabric}
                  editFabric={editFabric}
                  onDeleteFabric={onDeleteFabric}
                />
              ))
              :
              fabrics.map(fabric => (
                <FabricCard
                  key={fabric.id}
                  fabric={fabric}
                  editFabric={editFabric}
                  onDeleteFabric={onDeleteFabric}
                />
              ))
          } */}
        {
          !elementsFounded &&
          <Paginator
            paginator={paginator}
            path='fabric'
          />
        }
      </div>
    </>
  )
}