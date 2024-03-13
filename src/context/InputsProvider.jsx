import { useState } from "react"
import { InputsContext } from "./InputsContext";

export const InputsProvider = ({ children }) => {

  const [correderasDb, setCorrederasDb] = useState([]);
  const [elasticosDb, setElasticosDb] = useState([]);


  return (
    <InputsContext.Provider value={
      {
        elasticosDb,
        setElasticosDb
      }
    }>

      {children}

    </InputsContext.Provider>
  )

}