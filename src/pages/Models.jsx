import { useEffect, useState } from "react"
import { ModelsCard } from "../components/ModelsCard";
import { NewModelModal } from "../components/NewModelModal";

export const Models = () => {

  const [models, setModels] = useState([]);

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
        <NewModelModal />

        <section className="container row gap-3 mt-3">

          {models.map(({ nombre, tipoPrenda, id, temporada, tags }) => (
            <ModelsCard
              key={id}
              modelo={nombre}
              tipoPrenda={tipoPrenda}
              temporada={temporada}
              tags={tags}/>
          ))}

        </section>

      </div>
    </>
  )
}