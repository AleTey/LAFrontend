import { useEffect, useState } from "react"
import { ModelsCard } from "../components/ModelsCard";
import { NewModelModal } from "../components/NewModelModal";

export const Models = () => {

  const [models, setModels] = useState([]);

  const [modelFormIsOpen, setModelFormIsOpen] = useState(false);

  useEffect(() => {

    const modelsPetition = async () => {
      const res = await fetch("http://localhost:8080/models")
      const json = await res.json();
      setModels(json);
    }

    modelsPetition();

  }, [])

  return (
    <>
      <div className="container">
        <h2 className="my-3"> Models  </h2>
        <hr />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setModelFormIsOpen(true)}
        >
          Nuevo modelo
        </button>
        {
          modelFormIsOpen &&
          <NewModelModal
            setModelFormIsOpen={setModelFormIsOpen}
          />
        }

        <section className="container row gap-3 mt-3">

          {models.map(modelo => (
            <ModelsCard
            key={modelo.id}
              modelo={modelo} />
          ))}

        </section>

      </div>
    </>
  )
}