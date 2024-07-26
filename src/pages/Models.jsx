import { useContext, useEffect, useState } from "react"
import { ModelsCard } from "../components/ModelsCard";
import { NewModelModal } from "../components/NewModelModal";
import { useModel } from "../hooks/useModel";
import { FetchTopAlert } from "../components/alerts/FetchTopAlert";
import { AuthContext } from "../auth/context/AuthContext.Jsx";
import { hasAnyRole } from "../auth/utils/hasAnyRole";

export const Models = () => {

  // const [models, setModels] = useState([]);
  const { models, getAllModels, modelDbHasChanged } = useModel();

  const [modelFormIsOpen, setModelFormIsOpen] = useState(false);

  const { login } = useContext(AuthContext);

  useEffect(() => {

    getAllModels();

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

          {models && models.map(modelo => (
            <ModelsCard
              key={modelo.id}
              modelo={modelo} />
          ))}

        </section>

      </div>
    </>
  )
}