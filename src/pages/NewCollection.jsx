import { useEffect, useState } from "react"
import "../acss/newCollection.css"
import { useFabric } from "../hooks/useFabric";
import { NewCollectionState } from "../components/NewCollectionState";

export const NewCollection = () => {

  const [seasons, setSeasons] = useState([]);

  const [seasonSelected, setSeasonSelected] = useState("");

  const [seasonFabrics, setSeasonFabrics] = useState([]);

  const { findSeasons,
    findFabricsBySeason } = useFabric();

  useEffect(() => {
    if (seasons.length === 0) {
      findSeasons(setSeasons);
    }
  }, [])



  const onChangeSeason = (e) => {
    const { value } = e.target;
    setSeasonSelected(value);

    console.log(value);

    if (value !== "Temporada") {
      findFabricsBySeason(value, setSeasonFabrics)
    }
  }


  return (
    <>
      <div className="container">
        <h2 className="my-3"> Nueva colección  </h2>
        <hr />

        <div className="container">
          <select
            className="form-select form-select-sm mb-4"
            aria-label="Small select example"
            defaultValue="Temporada"
            style={{ maxWidth: "10rem" }}
            onChange={onChangeSeason}
          >
            <option defaultValue="Temporada">Temporada</option>
            {
              seasons?.map(season => (
                <option key={season} value={season}>{season}</option>
              ))
            }
          </select>
        </div>

        <div className="container">
          <ul className="nav nav-tabs" id="newCollection" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Telas</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Modelos</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" >Conjuntos</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="state-tab" data-bs-toggle="tab" data-bs-target="#state-tab-pane" type="button" role="tab" aria-controls="state-tab-pane" aria-selected="false" >Estado</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">...</div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">TELAS


              <div className="row gap-1 mt-4">
                {
                  seasonFabrics?.map(fabric => (
                    <div key={fabric.id} className="col-sm-6 col-md-4 col-lg-3 mb-3" style={{width: "8rem"}}>

                    <div key={fabric.id} className="card" style={{ width: "8rem" }}>
                      <abbr title={fabric.nombre} className="initialism">
                        <a href={fabric.urlFile} target="_blank">
                          {/* <img src={fabric.urlFile} className="card-img-top" style={{ objectFit: "cover", maxHeight: "15rem", maxWidth: "100%" }} alt="..." /> */}
                          <img src={fabric.urlFile} className="card-img-top" alt="..." style={{ maxHeight: "8rem", objectFit: "fill" }} />

                        </a>
                      </abbr>

                      {/* <div className="card-body">
                      </div> */}
                      </div>
                    </div>

                    // <div key={fabric.id} className="m-1" style={{ maxWidth: "6rem" }}>
                    //   <abbr title={fabric.nombre} className="initialism">
                    //     <a href={fabric.urlFile} target="_blank">
                    //       <img className="hover-img" src={fabric.urlFile} alt={fabric.nombre} style={{ maxWidth: "100%", maxHeight: "6rem", objectFit: "cover" }} />
                    //     </a>
                    //   </abbr>
                    // </div>
                  ))
                }
              </div>


            </div>
            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
              {/* <ModelsNewCollection /> */}
              {/* <ModelsNewCollectionWithTouch /> */}
            </div>
            <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">...</div>
            <div className="tab-pane fade" id="state-tab-pane" role="tabpanel" aria-labelledby="state-tab" tabIndex="0">
              <NewCollectionState
                season={seasonSelected}
              />
            </div>
          </div>
        </div>





      </div>
    </>
  )
}