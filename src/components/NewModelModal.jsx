import { useEffect, useState } from "react"
import { QuantityPerSize } from "./form/QuantityPerSize"

const modelFormInitialState = {
  model: "",
  tipo: "",
  temporada: "",
  id: "",
  tags: "",
  insumos: {
    elasticos: [],
    correderas: []
  },
  tiras: []
}

const checkboxInitialState = {
  eB7: false,
  eN7: false,
  eB15: false,
  eN15: false
}

const quantityPerSizeInitialState = {
  s: "",
  m: "",
  l: "",
  xl: "",
  xxl: "",
  xxxl: "",
}

const elasticPerSizeInitialState = {
  eB7: { quantityPerSizeInitialState },
  eN7: { quantityPerSizeInitialState },
  eB15: { quantityPerSizeInitialState },
  eN15: { quantityPerSizeInitialState }
}

// const tirasCheckBoxesInitialState = 
// cm3: false,
// cm4: false,
// cm5: false,
// cm6: false,
// cm7: false,
// cm8: false,
// cm9: false,
// cm10: false,




export const NewModelModal = () => {


  const [modelForm, setModelForm] = useState(modelFormInitialState);

  const [checkBoxes, setCheckBoxes] = useState(checkboxInitialState);

  const { model, tipo, temporada, id, tags, insumos, tiras } = modelForm;

  const [elasticPerSize, setElasticPerSize] = useState(elasticPerSizeInitialState);

  const [tirasCheckBoxes, setTirasCheckBoxes] = useState([]);

  const [insumosDB, setInsumosDB] = useState();

  const [tirasDB, setTirasDB] = useState([]);

  // const [perSize, setPerSize] = useState(quantityPerSizeInitialState);


  useEffect(() => {

    const fetchInsumos = async () => {
      const insumos = await fetch("http://localhost:4000/insumos")
      const res = await insumos.json();
      setInsumosDB(res);
      // console.log(insumosDB);
      // console.log(insumosDB.correderas);
    }
    fetchInsumos();
  }, []);

  useEffect(() => {
    const fetchTiras = async () => {
      const tiras = await fetch("http://localhost:5000/tiras")
      const res = await tiras.json();
      setTirasDB(res);
    }
    fetchTiras();
  }, [])

  useEffect(() => {

    setTirasCheckBoxes(
      tirasDB.map(tira => ({
        ...tira,
        selected: false
      }))
    );

    //  const selected = false;
    // tirasDB.map(tira=> (
    //   setTirasCheckBoxes(
    //     ...tirasCheckBoxes,
    //     tira
    //   )
    // ))

    // setTirasCheckBoxes(tirasDB)

    // tirasCheckBoxes.map()
  }, [tirasDB])


  const onChange = ({ target }) => {
    // console.log(target.name)
    // console.log(target.value)
    setModelForm({
      ...modelForm,
      [target.name]: target.value
    })
  }

  const onCheckboxChange = ({ target }) => {
    // console.log(insumosDB.correderas);

    const { name, checked } = target;
    setCheckBoxes({
      ...checkBoxes,
      [name]: checked
    })
  }

  const OnChangeQuantity = (tipoE, valueE) => {
    // console.log(tipoE + ": " + valueE)

    setElasticPerSize({
      ...elasticPerSize,
      [tipoE]: valueE
    })
  }

  const onCorrederasChange = (e) => {

    const isChecked = e.target.checked;

    setModelForm(prevModelForm => ({
      ...prevModelForm,
      insumos: {
        ...prevModelForm.insumos,
        correderas: isChecked
          ? [...prevModelForm.insumos.correderas, e.target.name]
          : prevModelForm.insumos.correderas.filter(corr => corr !== e.target.name),
      },
    }));
  }

  const onTirasCheckboxChange = ({ target }) => {
    // console.log(insumosDB.correderas);

    const { name, checked } = target;
    // const selected = !checked;

    // tirasCheckBoxes.map(tira => (
    //   tira.map(val => (

    //   ))
    // ))

    // tirasCheckBoxes.map(tiraa => (
    //   if (tiraa.id == name) {

    //   }
    // ))

    // console.log("tirasCheckBoxes:", tirasCheckBoxes);
    // tirasCheckBoxes.map(tira => (
    //   tira.id === name && (setTirasCheckBoxes([
    //     ...tira,
    //     [selected] = checked
    //   ]))
    // ))

    // setTirasCheckBoxes(prevTirasCheckBoxes => 
    //   prevTirasCheckBoxes.map(tira => 
    //     tira.id === name ? { ...tira, [selected]: checked } : tira
    //   )
    // );

    setTirasCheckBoxes(prevTirasCheckBoxes =>
      prevTirasCheckBoxes.map(tira =>
        tira.id === name ? { ...tira, ["selected"]: checked } : tira
      )
    );

    // setTirasCheckBoxes({
    //   ...tirasCheckBoxes,
    //   [name]: checked
    // })
  }


  return (
    <>

      <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Nuevo modelo
      </button>


      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nuevo insumo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container">


                <form action="" className="form-floating">

                  <div className="form-floating mb-3">
                    <input
                      type="text" className="form-control"
                      id="floatingInputNombre"
                      placeholder="nombre"
                      name="model"
                      value={model}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputNombre" className="h6">Nombre</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputTipo"
                      placeholder="tipo"
                      name="tipo"
                      value={tipo}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputTipo" className="h6">Tipo</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputTemporada"
                      placeholder="Temporada"
                      name="temporada"
                      value={temporada}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputTemporada" className="h6">Temporada</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="select"
                      className="form-control"
                      id="floatingInputTags"
                      placeholder="tags"
                      name="tags"
                      value={tags}
                      onChange={onChange}
                    />
                    <label htmlFor="floatingInputTags" className="h6">Tags</label>
                  </div>

                  <h4>Insumos</h4>
                  <div className="container">

                    <h6>Elástico</h6>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="eB7"
                        type="checkbox"
                        value={checkBoxes.eB7}
                        id="elastico7blanco"
                        onChange={onCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="elastico7blanco">
                        Elástico 7mm blanco
                      </label>
                    </div>

                    {checkBoxes.eB7 && <QuantityPerSize OnChangeQuantity={OnChangeQuantity} typeE="eB7" />}

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="eN7"
                        value={checkBoxes.eN7}
                        id="elastico7negro"
                        onChange={onCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="elastico7negro">
                        Elástico 7mm negro
                      </label>
                    </div>
                    {checkBoxes.eN7 && <QuantityPerSize OnChangeQuantity={OnChangeQuantity} typeE="eN7" />}

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="eB15"
                        value={checkBoxes.eB15}
                        id="elastico15blanco"
                        onChange={onCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="elastico15blanco">
                        Elástico 15mm blanco
                      </label>
                    </div>
                    {checkBoxes.eB15 && <QuantityPerSize OnChangeQuantity={OnChangeQuantity} typeE="eB15" />}

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="eN15"
                        value={checkBoxes.eN15}
                        id="elastico15negro"
                        onChange={onCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="elastico15negro">
                        Elástico 15mm negro
                      </label>
                    </div>
                    {checkBoxes.eN15 && <QuantityPerSize OnChangeQuantity={OnChangeQuantity} typeE="eN15" />}

                    <h6>Correderas</h6>

                    {insumosDB && insumosDB.correderas && insumosDB.correderas.map(corr => (
                      <div className="form-check" key={corr.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={corr.id}
                          value={modelForm.insumos.correderas}
                          id={`corredera ${corr.id}`}
                          onChange={onCorrederasChange}
                        />
                        <label className="form-check-label" htmlFor={`corredera ${corr.id}`}>
                          {corr.medida} {corr.material} {corr.color}
                        </label>
                      </div>
                    ))}

                    {/* <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="correderas11zp" />
                      <label className="form-check-label" htmlFor="correderas11zp">
                        11mm zamac plateado
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="correderas20zp" />
                      <label className="form-check-label" htmlFor="correderas20zp">
                        20mm zamac plateado
                      </label>
                    </div> */}

                    <h6>Broches casados</h6>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="broches-casados-zamac" />
                      <label className="form-check-label" htmlFor="broches-casados-zamac">
                        20mm zamac
                      </label>
                    </div>

                    <h6>Gancho soltero</h6>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="broches-soltero-zamac-20" />
                      <label className="form-check-label" htmlFor="broches-soltero-zamac-20">
                        20mm zamac
                      </label>
                    </div>
                    <h6>Argollas</h6>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="argollas-11-zamac" />
                      <label className="form-check-label" htmlFor="argollas-11-zamac">
                        11mm zamac
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="argollas-15-zamac" />
                      <label className="form-check-label" htmlFor="argollas-15-zamac">
                        15mm zamac
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="argollas-30-zamac" />
                      <label className="form-check-label" htmlFor="argollas-30-zamac">
                        30mm zamac
                      </label>
                    </div>


                    <h6>Chapita</h6>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="chapita-shell" />
                      <label className="form-check-label" htmlFor="chapita-shell">
                        Chapita shell LA
                      </label>
                    </div>

                    <h6>Etiquetas</h6>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="etiqueta-love-africa" />
                      <label className="form-check-label" htmlFor="etiqueta-love-africa">
                        Love Africa
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="etiqueta-isla" />
                      <label className="form-check-label" htmlFor="etiqueta-isla">
                        Isla
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="etiqueta-mini-africa" />
                      <label className="form-check-label" htmlFor="etiqueta-mini-africa">
                        Mini Africa
                      </label>
                    </div>

                  </div>


                  <h4 className="mt-3">TIRAS</h4>

                  {
                    
                    // console.log(tirasCheckBoxes)
                    tirasCheckBoxes.map(tira => (
                      <div className="form-check" key={tira.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={tira.id}
                          // value={tirasCheckBoxes.cm3}
                          value={tira.selected}
                          // id="tira3"
                          id={tira.id}
                          onChange={onTirasCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={tira.id}>
                          Tira{tira.ancho}
                        </label>
                      </div>         
                    ))
                  }

                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm3"
                      value={tirasCheckBoxes.cm3}
                      id="tira3"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira3">
                      Tira 3 cm
                    </label>
                  </div> */}

                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm3"
                      value={tirasCheckBoxes.cm3}
                      id="tira3"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira3">
                      Tira 3 cm
                    </label>
                  </div> */}

                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm4"
                      value={tirasCheckBoxes.cm4}
                      id="tira4"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira4">
                      Tira 4 cm
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm5" value={tirasCheckBoxes.cm5}
                      id="tira5"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira5">
                      Tira 5 cm
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm6" value={tirasCheckBoxes.cm6}
                      id="tira6"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira6">
                      Tira 6 cm
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm7"
                      value={tirasCheckBoxes.cm7}
                      id="tira7"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira7">
                      Tira 7 cm
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm8"
                      value={tirasCheckBoxes.cm8}
                      id="tira8"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira8">
                      Tira 8 cm
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm9"
                      value={tirasCheckBoxes.cm9}
                      id="tira9"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira9">
                      Tira 9 cm
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cm10"
                      value={tirasCheckBoxes.cm10}
                      id="tira10"
                      onChange={onTirasCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="tira10">
                      Tira 10 cm
                    </label>
                  </div> */}

                </form>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button type="submit" className="btn btn-primary">Crear</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

