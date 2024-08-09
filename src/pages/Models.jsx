import { useContext, useEffect, useState } from "react"
import { ModelsCard } from "../components/ModelsCard";
import { NewModelModal } from "../components/NewModelModal";
import { useModel } from "../hooks/useModel";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { hasAnyRole } from "../auth/utils/hasAnyRole";
import { Searcher } from "../components/Searcher";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const Models = () => {

  const { models, getAllModels, modelDbHasChanged, findAllPageModel, getModelPageByString, paginator, setPaginator } = useModel();

  const [modelFormIsOpen, setModelFormIsOpen] = useState(false);

  const { login } = useContext(AuthContext);

  const [searchIsActive, setSearchIsActive] = useState(false);

  const [stringToSearch, setStringToSearch] = useState("");

  const { page } = useParams();

  // const [paginator, setPaginator] = useState({});

  useEffect(() => {
    if (searchIsActive) {
      getModelPageByString(stringToSearch, page, setPaginator)
    } else {
      findAllPageModel(page, setPaginator);
    }

  }, [page])
  useEffect(() => {
    console.log(paginator);

  }, [])

  return (
    <>
      {
        modelDbHasChanged &&
        <FetchTopAlert
          text={modelDbHasChanged}
        />
      }
      <div className="container">
        <h2 className="my-3"> Models  </h2>
        <hr />
        <Searcher
          onClickSearch={getModelPageByString}
          path={'models'}
          setSearchIsActive={setSearchIsActive}
          setStringToSearch={setStringToSearch}
          pageNumber={page}
        />
        {
          hasAnyRole(login.user.authorities, ["CREATE_MODEL"]) &&
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setModelFormIsOpen(true)}
          >
            Nuevo modelo
          </button>
        }
        {
          modelFormIsOpen &&
          <NewModelModal
            setModelFormIsOpen={setModelFormIsOpen}
          />
        }

        <section className="container row gap-3 mt-3">

          {models?.length > 0
            ?
            models.map(modelo => (
              <ModelsCard
                key={modelo.id}
                modelo={modelo} />
            ))
            :

            <h6>No se han encontrado resultados para tu búsqueda</h6>
          }
        </section>


        <Paginator
          paginator={paginator}
          path='models'
        />

      </div>
    </>
  )
}