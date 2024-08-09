import { useEffect, useState } from "react"
import { ProductSimpleCard } from "./ProductSimpleCard";

export const NewCollectionState = ({ season }) => {

  const [generalSeasonState, setGeneralSeasonState] = useState([]);

  const [undo, setUndo] = useState([]);

  const [preparing, setPreparing] = useState([]);

  const [finished, setFinished] = useState([]);

  useEffect(() => {
    if (season !== "Temporada") {
      getGenerasSeasonState(season)
    }
  }, [])

  const getGenerasSeasonState = async (season) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lotes/general-season-state/2025`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
    if (res.ok) {
      const resJson = await res.json();

      const undoGroup = resJson["undo"];
      setUndo(
        undoGroup.map(p => {
          if (p.img !== null) {
            return {
              ...p,
              img: `data:image/jpeg;base64,${p.img}`
            }
          }
          return {
            ...p,
            img: null
          }
        })
      );

      const preparingGroup = resJson["preparing"];
      setPreparing(
        preparingGroup.map(p => {
          if (p.img !== null) {
            return {
              ...p,
              img: `data:image/jpeg;base64,${p.img}`
            }
          }
          return {
            ...p,
            img: null
          }
        })
      )

      const finishedGroup = resJson["finished"];
      setFinished(
        finishedGroup.map(p => {
          if (p.img !== null) {
            return {
              ...p,
              img: `data:image/jpeg;base64,${p.img}`
            }
          }
          return {
            ...p,
            img: null
          }
        })
      )

    } else {
      const error = await res.json();
      if (error.message === "Please Login") {
        handlerLogout();
      }
    }

  }
  return (
    <>
      <div className="container mt-4">
        <hr />
        <h5>Faltantes</h5>
        <hr />
        <div className="container d-flex column gap-3">
          <div className="container">
            <div className="row">
              {
                undo?.map(product => (
                  <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                    <ProductSimpleCard
                      product={product}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <hr />
        <h5>En producción</h5>
        <hr />
        <div className="container">
          <div className="row">
            {
              preparing?.map(product => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">

                  <ProductSimpleCard
                    product={product}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <hr />
        <h5>Al menos un lote finalizado</h5>
        <hr />
        <div className="container">
          <div className="row">
            {finished?.map(product => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                <ProductSimpleCard product={product} />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="container d-flex column gap-3">
          {
            finished?.map(product => (
              <ProductSimpleCard
                key={product.id}
                product={product}
              />
            ))
          }
        </div> */}
      </div>
    </>
  )
}