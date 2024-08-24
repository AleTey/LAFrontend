import { useState, useEffect, useContext } from "react"
import { FabricCard } from "../components/FabricCard"
import { NewFabricModal } from "../components/NewFabricModal";
import { Paginator } from "../components/Paginator";
import { useParams } from "react-router-dom";
import { Searcher } from "../components/Searcher";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { hasAnyRole } from "../auth/utils/hasAnyRole";
import { FabricContext } from "../context/FabricContext";


export const Fabric = () => {

  const { page } = useParams();

  const [elementsFounded, setElementsFounded] = useState();

  const [searchIsActive, setSearchIsActive] = useState(false);

  const [stringToSearch, setStringToSearch] = useState("")

  const { login } = useContext(AuthContext);

  // const [paginator, setPaginator] = useState({});

  const {
    fabricModalIsOpen,
    fabricWasAdded,
    fabricWasEdited,
    fabricWasDeleted,
    fabrics,
    paginator,
    setPaginator,
    setFabricModalIsOpen,
    onNewFabric,
    getAllFabricsPages,
    getAllFabricsDtoPages,
    addNewFabric,
    editFabric,
    onDeleteFabric,
    searchFabricByString,
    searchFabricDtoByString,
    fabricIsLoading,
  } = useContext(FabricContext);


  useEffect(() => {
    if (searchIsActive) {
      hasAnyRole(login.user.authorities, ["ROLE_ADMIN"]) ?
        searchFabricByString(stringToSearch, page, setPaginator)
        :
        searchFabricDtoByString(stringToSearch, page, setPaginator)
    } else {
      hasAnyRole(login.user.authorities, ["ROLE_ADMIN"]) ?
        getAllFabricsPages(page, setPaginator)
        :
        getAllFabricsDtoPages(page, setPaginator)
    }
  }, [, page])

  const onSearch = (stringToSearch, page) => {
    hasAnyRole(login.user.authorities, ["ROLE_ADMIN"]) ?
      searchFabricByString(stringToSearch, page, setPaginator)
      :
      searchFabricDtoByString(stringToSearch, page, setPaginator)
  }

  if (fabricIsLoading) {
    return (
      <>
        <div className="container position-absolute top-50 start-50 translate-middle d-flex justify-content-center" style={{ width: "100vw" }}>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    )
  }


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
        {
          hasAnyRole(login.user.authorities, ["CREATE_FABRIC"]) &&
          <button type="button" className="btn btn-outline-primary" onClick={onNewFabric}>
            Nueva tela
          </button>
        }

        <Searcher
          onClickSearch={onSearch}
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