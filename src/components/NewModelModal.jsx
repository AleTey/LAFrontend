import { useEffect, useState } from "react"
import { Input } from "./formComponents/Input"
import { SelectStrings } from "./formComponents/SelectStrings"
import { useCorredera } from "../hooks/inputs/useCorredera"
import { AccordionItem } from "./bootstrapComponents/AccordionItem"
import { useArgolla } from "../hooks/inputs/useArgolla"
import { useElastico } from "../hooks/inputs/useElastico"
import { useGancho } from "../hooks/inputs/useGancho"
import { useEtiqueta } from "../hooks/inputs/useEtiqueta"
import { useAplique } from "../hooks/inputs/useAplique"

// const modelFormInitialState = {
//   model: "",
//   tipo: "",
//   temporada: "",
//   id: "",
//   tags: "",
//   insumos: {
//     elasticos: [],
//     correderas: []
//   },
//   tiras: []
// }

const modelFormInitialState = {
  model: "",
  tipo: "",
  // id: 0,
  // tags: "",
  detalleInsumos: [],
  detalleTiraModelo: [],
  detalle: ""
}


export const NewModelModal = () => {

  const [modelForm, setModelForm] = useState(modelFormInitialState);

  const [tiposPrenda, setTiposPrendas] = useState([]);

  const [tiras, setTiras] = useState([]);

  const { correderas, findAllCorrederas } = useCorredera();

  const { argollas, findAllArgollas } = useArgolla();

  const { elasticos, findAllElasticos } = useElastico();

  const { ganchos, findAllGanchos } = useGancho();

  const { etiquetas, findAllEtiquetas } = useEtiqueta();

  const { apliques, findAllApliques } = useAplique();

  const [correderasSelected, setCorrederasSelected] = useState([]);

  const [checkedBoxes, setCheckedBoxes] = useState({});

  const [tallesDisponibles, setTallesDisponibles] = useState([]);

  const [tirasChecked, setTirasChecked] = useState({})

  const [detallesTiraModelo, setDetallesTiraModelo] = useState([]);


  const fetchTiposPrenda = async () => {
    const getTiposPrendas = await fetch("http://localhost:8080/tiposPrenda");
    if (getTiposPrendas.ok) {
      const tiposPrendasJson = await getTiposPrendas.json();
      setTiposPrendas(tiposPrendasJson);
    }
  }

  const getAllTiras = async () => {
    const getTiras = await fetch("http://localhost:8080/tiras")
    if (getTiras.ok) {
      const tirasJson = await getTiras.json();
      setTiras(tirasJson);
    }
  }

  useEffect(() => {
    if (tiposPrenda.length === 0) {
      fetchTiposPrenda();
    }
    if (tiras.length === 0) {
      getAllTiras();
    }

  }, []);

  useEffect(() => {
    if (correderas.length === 0) {
      findAllCorrederas();
    }
    if (argollas.length === 0) {
      findAllArgollas()
    }
    if (elasticos.length === 0) {
      findAllElasticos();
    }
    if (ganchos.length === 0) {
      findAllGanchos();
    }
    if (etiquetas.length === 0) {
      findAllEtiquetas();
    }
    if (apliques.length === 0) {
      findAllApliques();
    }
  }, [])


  //Actually Working!!!!!!!!

  const onTallesDisponiblesChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setTallesDisponibles([
        ...tallesDisponibles,
        value
      ])
      detallesTiraModelo.length > 0 &&
        setDetallesTiraModelo(prevDet => {
          return prevDet.map(detalle => {
            return {
              ...detalle,
              tirasPorTalle: {
                ...detalle.tirasPorTalle,
                [value]: 0
              }
            };
          });
        });
      // setDetallesTiraModelo([
      //   detallesTiraModelo.map(detalle => {
      //     return { ...detalle, tirasPorTalle: { ...detalle.tirasPorTalle, [value]: 0 } }
      //   })
      // ])
    } else {
      setTallesDisponibles([
        ...tallesDisponibles.filter(talle => talle !== value)
      ])
      setDetallesTiraModelo(prevDetalles =>
        prevDetalles.map(detalle => {
          // Filtramos las claves del objeto 'tirasPorTalle' y excluimos aquella que coincida con el valor 'value'
          const { [value]: deletedKey, ...newTirasPorTalle } = detalle.tirasPorTalle;
          // Retornamos una copia del detalle con el nuevo objeto 'tirasPorTalle' sin la clave eliminada
          return { ...detalle, tirasPorTalle: newTirasPorTalle };
        })
      );
      // setDetallesTiraModelo([
      //   detallesTiraModelo.map(detalle => {
      //     return { ...detalle, tirasDetalle: { ...detalle.tirasPorTalle.filter(Object.keys(tirasPorTalle) !== value) } }
      //   })
      // ])

      // console.log(tallesDisponibles.length)
      if (tallesDisponibles.length === 1) {
        console.log(tallesDisponibles.length)
        console.log("luego")
        setCheckedBoxes({})
        setTirasChecked({})
        setCorrederasSelected([])
        console.log(correderasSelected)
        setDetallesTiraModelo([])
        return
        // setCorrederasSelected(...[])
        // setCheckedBoxes(
        //   Object.keys(checkedBoxes).forEach(key => {
        //     checkedBoxes[key] = false;
        //   })
        // )
      }

    }

    if (correderasSelected.length > 0) {
      if (checked) {
        setCorrederasSelected([
          ...correderasSelected.map(inp => {
            if (Object.keys(inp).includes('cantidad')) {
              return inp
            } else {
              return { ...inp, [value]: 0 }
            }
          })
        ])
      } else {

        setCorrederasSelected([
          ...correderasSelected.map(inp => {
            if (Object.keys(inp).includes('cantidad')) {
              return inp
            }
            const inpModified = { ...inp };
            delete inpModified[value]
            return inpModified
          })
        ])
      }
    }


    // if (tallesDisponibles.length > 0) {
    //   setDetallesTiraModelo([
    //     detallesTiraModelo.map(detalle => {
    //       console.log(detalle.tirasPorTalle);
    //     })
    //   ])
    // }
  }

  const onChange = ({ target }) => {
    setModelForm({
      ...modelForm,
      [target.name]: target.value
    })
  }

  const checkedBoxesHandler = (id) => {
    setCheckedBoxes({
      ...checkedBoxes,
      [id]: !checkedBoxes[id]
    })
  }

  const onChangeCorrederasSelected = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCorrederasSelected([
        ...correderasSelected,
        {
          input: {
            id: value,
          },
          cantidad: 0
        }
      ])
    } else {
      setCorrederasSelected([
        ...correderasSelected.filter(corr => corr.input.id !== value)
      ])
    }
  }

  const onChangeCant = (e, id, el = false) => {
    const { name, value } = e.target;

    if (el) {
      setCorrederasSelected(
        correderasSelected.map(inp => {
          if (inp.input.id == id) {
            inp[name] = value
            return inp;
          }
          return inp;
        })
      )
    } else {
      setCorrederasSelected(
        correderasSelected.map(inp => {
          if (inp.input.id == id) {
            return { ...inp, cantidad: value }
          }
          return inp;
        })
      )
    }
  }

  const onChangeElastico = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      const ela = {
        input: {
          id: value
        }
      }
      tallesDisponibles.forEach(t => {
        ela[t] = 0;
      })
      setCorrederasSelected([...correderasSelected, ela])

    } else {
      setCorrederasSelected([
        ...correderasSelected.filter(inp => inp.input.id != value)
      ])
    }
  }

  const buscarValueParaCant = (id, talle) => {
    correderasSelected.map(el => {
      if (el.input.id == id) {
        console.log(el[talle])
        return el[talle];
      }
    })
  }

  const tirasCheckedListHandler = (e) => {
    const { value } = e.target;

    setTirasChecked({
      ...tirasChecked,
      [value]: !tirasChecked[value]
    })
  }

  const OnTirasChange = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setDetallesTiraModelo([
        ...detallesTiraModelo,
        {
          tira: {
            id: value
          },
          tirasPorTalle: tallesDisponibles.reduce((acc, t) => {
            // console.log(t)
            return {
              ...acc,
              [t]: 0
            };
          }, {})
        }
      ])
    } else {
      setDetallesTiraModelo([
        ...detallesTiraModelo.filter(detalle => detalle.tira.id != value)
      ])
    }

  }

  const buscarValueParaCantTiras = (idT, t) => {
    detallesTiraModelo.map(el => {
      if (el.tira.id == idT) {
        console.log(el.tirasPorTalle[t])
        return el.tirasPorTalle[t];
      }
    })
  }

  const onChangeCantTiras = (e, tiraId) => {
    const { name, value } = e.target;

    setDetallesTiraModelo(prevDetalles => {
      // Crear una copia del array de detallesTiraModelo y modificar el detalle correspondiente
      const updatedDetalles = prevDetalles.map(detalle => {
        if (detalle.tira.id == tiraId) {
          // Crear una copia del objeto tirasPorTalle y actualizar el valor del talle
          const updatedTirasPorTalle = { ...detalle.tirasPorTalle, [name]: value };
          // Devolver un nuevo objeto detalle con el tirasPorTalle actualizado
          return { ...detalle, tirasPorTalle: updatedTirasPorTalle };
        }
        // Si no es el detalle que queremos actualizar, devolverlo sin cambios
        return detalle;
      });

      // Devolver el nuevo array de detallesTiraModelo actualizado
      return updatedDetalles;
    });

    // setDetallesTiraModelo([
    //   detallesTiraModelo.map(detalle => {
    //     if (detalle.tira.id == tiraId) {
    //       detalle.tirasPorTalle[name] = value;
    //       console.log(detalle.tirasPorTalle[name])
    //       return detalle
    //     }
    //     return detalle
    //   })
    // ])
  }

  //// SEGUNDO

  // const onDetalleTiraModeloCantChange = (e) => {
  //   const { checked, value } = e.target

  //   if (checked) {
  //     setDetallesTiraModelo([
  //       ...detallesTiraModelo,
  //       {
  //         tira: {
  //           id: value
  //         },
  //         tirasPorTalle: tallesDisponibles.reduce((acc, t) => {
  //           return {
  //             ...acc,
  //             [t]: 0
  //           };
  //         }, {})
  //       }
  //     ])
  //   }
  // }

  const onCantTirasChange = (e, id) => {
    const { name, value } = e.target;
    setDetallesTiraModelo([
      detallesTiraModelo.map(detalle => {
        if (detalle.tira.id == id) {
          console.log(detalle.tira.id)
          console.log(id)
          detalle.tirasPorTalle[name] = value
          console.log(detalle.tirasPorTalle)
          return detalle;
        }
        return detalle;
      })
    ])

    setCorrederasSelected(
      correderasSelected.map(inp => {
        if (inp.input.id == id) {
          inp[name] = value
          return inp;
        }
        return inp;
      })
    )

  }

  const cantTirasValueSearcher = (id, talle) => {
    try {

      detallesTiraModelo.map(detalle => {
        if (detalle.tira.id && id && detalle.tira.id == id) {
          console.log(detalle)
          console.log(detalle.tirasPorTalle)
          console.log(Object.keys(detalle.tirasPorTalle))
          console.log(talle)
          console.log(Object.entries(detalle.tirasPorTalle))
          Object.entries(detalle.tirasPorTalle).forEach(([key, value]) => {
            // console.log(key + " " + value);
            if (key === talle) {
              console.log(value);
              return value;
            }
          })
          // if (Object.entries(detalle.tirasPorTalle).key === talle) {
          //   console.log(talle)
          //   console.log("OK")
          // }

          // return detalle.tirasPorTalle[talle]
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando formulario")
    modelForm.detalleInsumos = correderasSelected;
    modelForm.detalleTiraModelo = detallesTiraModelo;
    console.log(modelForm)
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
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nuevo Modelo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container">


                <form action="" >

                  <Input
                    name="model"
                    value={modelForm.model}
                    type="text"
                    placeHolder="Nombre del Modelo"
                    onChangeInput={onChange}
                  />

                  <SelectStrings
                    defaultValue=""
                    name="tipo"
                    onChangeMethod={onChange}
                    initialValueText="TipoPrenda"
                    array={tiposPrenda}
                  />

                  <h4>Talles disponibles</h4>

                  <section className="d-flex justify-content-between mb-2">
                    <div className="d-flex gap-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="S"
                        id="S"
                        onChange={onTallesDisponiblesChange}
                      />
                      <label className="form-check-label" htmlFor="S">
                        S
                      </label>
                    </div>

                    <div className="d-flex gap-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="M"
                        id="M"
                        onChange={onTallesDisponiblesChange}
                      />
                      <label className="form-check-label" htmlFor="M">
                        M
                      </label>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="L"
                        id="L"
                        onChange={onTallesDisponiblesChange}
                      />
                      <label className="form-check-label" htmlFor="L">
                        L
                      </label>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="XL"
                        id="XL"
                        onChange={onTallesDisponiblesChange}
                      />
                      <label className="form-check-label" htmlFor="XL">
                        XL
                      </label>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="XXL"
                        id="XXL"
                        onChange={onTallesDisponiblesChange}
                      />
                      <label className="form-check-label" htmlFor="XXL">
                        XXL
                      </label>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="XXXL"
                        id="XXXL"
                        onChange={onTallesDisponiblesChange}
                      />
                      <label className="form-check-label" htmlFor="XXXL">
                        XXXL
                      </label>
                    </div>


                  </section>

                  <h4>Insumos</h4>
                  <div className="container">
                    {
                      tallesDisponibles.length > 0 &&
                      <div className="accordion" id="accordionExample">
                        <AccordionItem
                          id="correderas"
                          titulo="Correderas"
                        >

                          {
                            correderas &&
                            correderas.map(corr => (
                              <div key={corr.id} className="">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={corr.id}
                                    id={`flexCheckDefault${corr.id}`}
                                    onChange={e => {
                                      onChangeCorrederasSelected(e),
                                        checkedBoxesHandler(corr.id)
                                    }}
                                  />
                                  <label className="form-check-label" htmlFor={`flexCheckDefault${corr.id}`}>
                                    {corr.nombre}
                                  </label>
                                </div>

                                {checkedBoxes[corr.id] &&
                                  <div className="form-floating mb-3">
                                    <input
                                      type="number"
                                      className="form-control-sm"
                                      id={`floatingInput${corr.id}`}
                                      placeholder="Cantidad"
                                      value={correderasSelected.cantidad}
                                      onChange={e => onChangeCant(e, corr.id)}
                                    />
                                    <label htmlFor={`floatingInput${corr.id}`}></label>
                                  </div>

                                }
                              </div>
                            ))
                          }

                        </AccordionItem>

                        <AccordionItem
                          titulo="Argollas"
                          id="argollas"
                        >
                          {
                            argollas && argollas.map(arg => (
                              <div key={arg.id} className="">

                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={arg.id}
                                    id={`flexCheckDefault${arg.id}`}
                                    onChange={e => {
                                      onChangeCorrederasSelected(e),
                                        checkedBoxesHandler(arg.id)
                                    }}
                                  />
                                  <label className="form-check-label" htmlFor={`flexCheckDefault${arg.id}`}>
                                    {arg.nombre}
                                  </label>
                                </div>

                                {checkedBoxes[arg.id] &&
                                  <div className="input-group input-group-sm mb-3 col">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad</span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id={`floatingInput${arg.id}`}
                                      placeholder="Cantidad"
                                      value={correderasSelected.cantidad}
                                      onChange={e => onChangeCant(e, arg.id)}
                                    />
                                    <label htmlFor={`floatingInput${arg.id}`}></label>
                                  </div>

                                }
                              </div>
                            ))
                          }
                        </AccordionItem>

                        <AccordionItem
                          titulo="Elasticos"
                          id="elasticos"
                        >

                          {
                            elasticos &&
                            elasticos.map(elastico => (
                              <section key={elastico.id}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={elastico.id}
                                    id={`flexCheckDefault${elastico.id}`}
                                    onChange={e => {
                                      onChangeElastico(e),
                                        checkedBoxesHandler(elastico.id)
                                    }}
                                    disabled={tallesDisponibles.length === 0}
                                  />
                                  <label className="form-check-label" htmlFor={`flexCheckDefault${elastico.id}`}>
                                    {elastico.nombre}
                                  </label>
                                </div>
                                {/* <section className="container d-flex col gap-2"> */}
                                <section className="row">
                                  {
                                    checkedBoxes[elastico.id] &&
                                    tallesDisponibles.map(t => (
                                      <div key={t} className="col-sm-6">

                                        <div className="input-group input-group-sm mb-3 col"  >
                                          <span className="input-group-text" id="inputGroup-sizing-sm">{t}</span>
                                          <input
                                            className="form-control"
                                            name={t}
                                            value={buscarValueParaCant(elastico.id, t)}
                                            type="number"
                                            onChange={(e) => { onChangeCant(e, elastico.id, true) }}

                                          />
                                        </div>
                                      </div>
                                    ))
                                  }
                                </section>
                              </section>
                            ))
                          }
                        </AccordionItem>

                        <AccordionItem
                          titulo="Ganchos"
                          id="ganchos"
                        >
                          {
                            ganchos &&
                            ganchos.map(gancho => (
                              <div key={gancho.id}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // name={gancho.nombre}
                                    value={gancho.id}
                                    id={`gancho${gancho.id}`}
                                    onChange={(e) => {
                                      onChangeCorrederasSelected(e)
                                      checkedBoxesHandler(gancho.id)

                                    }}

                                  />
                                  <label className="form-check-label" htmlFor={`gancho${gancho.id}`}>
                                    {gancho.nombre}
                                  </label>
                                </div>
                                {
                                  checkedBoxes[gancho.id] &&
                                  <div className="input-group input-group-sm mb-3 col">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad</span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id={`floatingInput${gancho.id}`}
                                      placeholder="Cantidad"
                                      value={correderasSelected.cantidad}
                                      onChange={e => onChangeCant(e, gancho.id)}
                                    />
                                    <label htmlFor={`floatingInput${gancho.id}`}></label>
                                  </div>

                                }
                              </div>
                            ))
                          }
                        </AccordionItem>

                        <AccordionItem
                          titulo="Etiquetas"
                          id="etiquetas"
                        >
                          {
                            etiquetas &&
                            etiquetas.map(etiqueta => (
                              <div key={etiqueta.id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  // name={gancho.nombre}
                                  value={etiqueta.id}
                                  id={`etiqueta${etiqueta.id}`}
                                  onChange={(e) => {
                                    onChangeCorrederasSelected(e)
                                    checkedBoxesHandler(etiqueta.id)

                                  }}
                                />
                                <label className="form-check-label" htmlFor={`etiqueta${etiqueta.id}`}>
                                  {etiqueta.nombre}
                                </label>

                                {
                                  checkedBoxes[etiqueta.id] &&
                                  <div className="input-group input-group-sm mb-3 col">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad</span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id={`floatingInput${etiqueta.id}`}
                                      placeholder="Cantidad"
                                      value={correderasSelected.cantidad}
                                      onChange={e => onChangeCant(e, etiqueta.id)}
                                    />
                                    <label htmlFor={`floatingInput${etiqueta.id}`}></label>
                                  </div>
                                }

                              </div>
                            ))
                          }
                        </AccordionItem>

                        <AccordionItem
                          titulo="Apliques"
                          id="aplique"
                        >
                          {
                            apliques &&
                            apliques.map(aplique => (
                              <div key={aplique.id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  // name={gancho.nombre}
                                  value={aplique.id}
                                  id={`aplique${aplique.id}`}
                                  onChange={(e) => {
                                    onChangeCorrederasSelected(e)
                                    checkedBoxesHandler(aplique.id)
                                  }}
                                />
                                <label className="form-check-label" htmlFor={`aplique${aplique.id}`}>
                                  {aplique.nombre}
                                </label>
                                {
                                  checkedBoxes[aplique.id] &&
                                  <div className="input-group input-group-sm mb-3 col">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad</span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id={`floatingInput${aplique.id}`}
                                      placeholder="Cantidad"
                                      value={correderasSelected.cantidad}
                                      onChange={e => onChangeCant(e, aplique.id)}
                                    />
                                    <label htmlFor={`floatingInput${aplique.id}`}></label>
                                  </div>
                                }
                              </div>
                            ))
                          }
                        </AccordionItem>

                      </div>
                    }
                  </div>


                  <h4 className="mt-3">TIRAS</h4>


                  {/* {
                    tiras &&
                    tiras.map(tira => (

                      // <section key={tira.id}>
                      <div className="form-check" key={tira.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={tira.id}
                          id={`tiras${tira.id}`}
                          onChange={e => {
                            OnTirasChange(e),
                              tirasCheckedListHandler(e)
                          }}
                          disabled={tallesDisponibles.length === 0}
                        />
                        <label className="form-check-label" htmlFor={`tiras${tira.id}`}>
                          {`${tira.ancho} cm`}
                        </label>
                        {
                          tallesDisponibles && tallesDisponibles.map(t => {
                            { console.log(t) }
                            { <button></button> }
                            // <div key={t} className="col-sm-6">
                            <div key={t}>
                              <div className="input-group input-group-sm mb-3 col"  >
                                <span className="input-group-text" id="inputGroup-sizing-sm">{t}</span>
                                <input
                                  className="form-control"
                                  name={t}
                                  value={() => buscarValueParaCantTiras(tira.id, t)}
                                  // value={buscarValueParaCantTiras(tira.id, t)}
                                  type="number"
                                  onChange={(e) => { onChangeCantTiras(e, tira.id) }}
                                />
                              </div>


                              <div className="input-group input-group-sm mb-3 col"  >
                                <span className="input-group-text" id="inputGroup-sizing-sm">{t}</span>
                                <input
                                  className="form-control"
                                  name={t}
                                  value={cantTirasValueSearcher(tira.id, t)}
                                  // value={detallesTiraModelo(tira.id, t)}
                                  type="number"
                                  onChange={(e) => { onCantTirasChange(e, tira.id) }}
                                />
                              </div>

                            </div>



                          })
                        }
                      </div>

                      // </section>
                    ))
                  } */}


                  {
                    tiras && tallesDisponibles.length > 0 &&
                    tiras.map(tira => (
                      <div key={tira.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={tira.id}
                          id={`tira${tira.id}`}
                          onChange={(e) => {
                            OnTirasChange(e)
                            tirasCheckedListHandler(e)
                          }}
                        />
                        <label className="form-check-label" htmlFor={`tira${tira.id}`}>
                          {`${tira.ancho} cm`}
                        </label>
                        {
                          tirasChecked[tira.id] && tallesDisponibles &&
                          tallesDisponibles.map((t) => (
                            <div key={t} className="col-sm-6">
                              <div className="input-group input-group-sm mb-3 col"  >
                                <span className="input-group-text" id="inputGroup-sizing-sm">{t}</span>
                                <input
                                  className="form-control"
                                  name={t}
                                  value={cantTirasValueSearcher(tira.id, t)}
                                  // value={detallesTiraModelo(tira.id, t)}
                                  type="number"
                                  onChange={(e) => { onChangeCantTiras(e, tira.id) }}
                                />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }

                </form>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button type="submit" className="btn btn-primary" onClick={onSubmit}>Crear</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

