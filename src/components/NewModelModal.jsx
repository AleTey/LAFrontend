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
import Swal from 'sweetalert2'
import { useModel } from "../hooks/useModel"


const modelFormInitialState = {
  nombre: "",
  tipoPrenda: "",
  tallesDisponibles: [],
  detalleInsumos: [],
  detalleTiraModelo: [],
  detalle: ""
}

const validationModelForm = (modelForm) => {
  let errors = {};

  if (!modelForm.nombre.trim()) {
    errors.nombre = "Ingresar un nombre para el modelo"
  }

  if (!modelForm.tipoPrenda || modelForm.tipoPrenda === "TipoPrenda") {
    errors.tipoPrenda = "Se debe elegir una opción"
  }

  return errors;
}

const inputValidation = (inputsSelected, detallesTiraModelo) => {
  let emptyInputs = false;

  if (inputsSelected.length > 0) {
    console.log(inputsSelected)
    inputsSelected.map(el => {
      if ((!el.cantidad || el.cantidad === 0) && (!el.cantidadPorTalle || el.cantidadPorTalle === 0)) {
        emptyInputs = true
        console.log("EN inputSelected")
      }
    })
  }

  // console.log(detallesTiraModelo)
  if (detallesTiraModelo && detallesTiraModelo.length > 0) {
    console.log(detallesTiraModelo)
    detallesTiraModelo.map(el => {
      if (el.tirasPorTalle && Object.keys(el.tirasPorTalle).length > 0) {
        if (Object.values(el.tirasPorTalle).includes(0)) {
          console.log("en detallesTiraModelo");
          emptyInputs = true
        }
      }
    })
  }
  console.log(emptyInputs)
  return emptyInputs;
}


export const NewModelModal = ({ modelData = modelFormInitialState, setModelFormIsOpen }) => {

  const [modelForm, setModelForm] = useState(modelData);

  const [tiposPrenda, setTiposPrendas] = useState([]);

  const [tiras, setTiras] = useState([]);

  const { correderas, findAllCorrederas } = useCorredera();

  const { argollas, findAllArgollas } = useArgolla();

  const { elasticos, findAllElasticos } = useElastico();

  const { ganchos, findAllGanchos } = useGancho();

  const { etiquetas, findAllEtiquetas } = useEtiqueta();

  const { apliques, findAllApliques } = useAplique();

  const [inputsSelected, setInputsSelected] = useState([]);

  const [checkedBoxes, setCheckedBoxes] = useState({});

  const [tallesDisponibles, setTallesDisponibles] = useState([]);

  const [tirasChecked, setTirasChecked] = useState({});

  const [detallesTiraModelo, setDetallesTiraModelo] = useState([]);

  const [formErrors, setFormErrors] = useState({});

  const { saveModel, updateModel } = useModel();



  const fetchTiposPrenda = async () => {
    const getTiposPrendas = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tiposPrenda`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    });
    if (getTiposPrendas.ok) {
      const tiposPrendasJson = await getTiposPrendas.json();
      setTiposPrendas(tiposPrendasJson);
    }
  }

  const getAllTiras = async () => {
    const getTiras = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tiras`, {
      headers: {
        "Authorization": sessionStorage.getItem("token")
      }
    })
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

    if (modelForm.id) {
      modelForm.detalleInsumos.forEach(detalle => {
        setCheckedBoxes(prevState => ({
          ...prevState,
          [detalle.input.id]: true
        }));
      });
      modelForm.detalleTiraModelo.map(detalle => {
        setTirasChecked(prevState => ({
          ...prevState,
          [detalle.tira.id]: true
        }))
      })

      setTallesDisponibles(modelForm.tallesDisponibles)
      setInputsSelected(modelForm.detalleInsumos)
      setDetallesTiraModelo(modelForm.detalleTiraModelo)
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
    console.log(checked)

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

      if (tallesDisponibles.length === 1) {
        setCheckedBoxes({})
        setTirasChecked({})
        setInputsSelected([])
        setDetallesTiraModelo([])
        return
      }

    }

    if (inputsSelected.length > 0) {
      if (checked) {
        setInputsSelected([
          ...inputsSelected.map(inp => {
            if (inp.cantidad) {
              return inp
            } else {
              return { ...inp, cantidadPorTalle: { ...inp.cantidadPorTalle, [value]: 0 } }
            }
          })
        ])
      } else {

        setInputsSelected([
          ...inputsSelected.map(inp => {
            if (inp.cantidad) {
              return inp
            }
            const inpModified = { ...inp };
            delete inpModified.cantidadPorTalle[value]
            return inpModified
          })
        ])
      }
    }

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

  const onChangeInputsSelected = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setInputsSelected([
        ...inputsSelected,
        {
          input: {
            id: value,
          },
          cantidad: 0
        }
      ])
    } else {
      setInputsSelected([
        ...inputsSelected.filter(corr => corr.input.id != value)
      ])
    }
  }

  const onChangeCant = (e, id, el = false) => {
    const { name, value } = e.target;

    if (el) {
      setInputsSelected(
        inputsSelected.map(inp => {
          if (inp.input.id == id) {
            inp.cantidadPorTalle[name] = value
            return inp;
          }
          return inp;
        })
      )
    } else {
      setInputsSelected(
        inputsSelected.map(inp => {
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
        },
        cantidadPorTalle: {}
      }
      tallesDisponibles.forEach(t => {
        // ela.tallesDisponibles[t] = 0;
        ela.cantidadPorTalle = {
          ...ela.cantidadPorTalle,
          [t]: 0
        }
      })
      setInputsSelected([...inputsSelected, ela])

    } else {
      setInputsSelected([
        ...inputsSelected.filter(inp => inp.input.id != value)
      ])
    }
  }

  const buscarValueParaCant = (id, talle) => {
    inputsSelected.map(el => {
      if (el.input.id == id) {
        return el.cantidadPorTalle[talle];
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
        return detalle;
      });

      return updatedDetalles;
    });
  }


  const cantTirasValueSearcher = (id, talle) => {
    try {
      detallesTiraModelo.map(detalle => {
        if (detalle.tira.id && id && detalle.tira.id == id) {
          Object.entries(detalle.tirasPorTalle).forEach(([key, value]) => {
            // console.log(key + " " + value);
            if (key === talle) {
              return value;
            }
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validationModelForm(modelForm)).length === 0) {
      if (inputValidation(inputsSelected, detallesTiraModelo)) {
        // console.log(Object.keys(validationModelForm))
      }
      if (!inputValidation(inputsSelected, detallesTiraModelo)) {
        modelForm.tallesDisponibles = tallesDisponibles;
        modelForm.detalleInsumos = inputsSelected;
        modelForm.detalleTiraModelo = detallesTiraModelo;
        console.log(modelForm)
        if (!modelForm.id) {
          saveModel(modelForm, setModelFormIsOpen);
        } else {
          updateModel(modelForm, setModelFormIsOpen)
        }
      } else {
        Swal.fire({
          title: "Valor de cantidad en 0",
          text: "Uno o mas de los valores de cantidad están en 0. Si se guarda en cero por error podría traer problemas en los cálculos de costos",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Continuar de todas formas!"
        }).then((result) => {
          if (result.isConfirmed) {
            modelForm.tallesDisponibles = tallesDisponibles;
            modelForm.detalleInsumos = inputsSelected;
            modelForm.detalleTiraModelo = detallesTiraModelo;
            console.log(modelForm)
            if (!modelForm.id) {
              saveModel(modelForm);
            } else {
              updateModel(modelForm)
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      }

    } else {
      setFormErrors(validationModelForm(modelForm));
    }


  }

  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Nuevo Modelo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModelFormIsOpen(false)}></button>
            </div>
            <div className="modal-body">

              <div className="container">

                <form action="" >

                  <Input
                    name="nombre"
                    value={modelForm.nombre}
                    type="text"
                    placeHolder="Nombre del Modelo"
                    onChangeInput={onChange}
                  />
                  {formErrors.nombre && <p className="text-danger">{formErrors.nombre}</p>}
                  {
                    !modelForm.id ?
                      <SelectStrings
                        defaultValue=""
                        name="tipoPrenda"
                        onChangeMethod={onChange}
                        initialValueText="TipoPrenda"
                        array={tiposPrenda}
                      />
                      :
                      <SelectStrings
                        defaultValue={modelForm.tipoPrenda}
                        name="tipoPrenda"
                        onChangeMethod={onChange}
                        initialValueText={modelForm.tipoPrenda}
                        array={tiposPrenda}
                      />
                  }
                  {formErrors.tipoPrenda && <p className="text-danger">{formErrors.tipoPrenda}</p>}

                  <h4>Talles disponibles</h4>
                  {
                    <section className="d-flex justify-content-between mb-2">
                      <div className="d-flex gap-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="S"
                          id="S"
                          onChange={onTallesDisponiblesChange}
                          checked={tallesDisponibles && tallesDisponibles.includes('S')}
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
                          checked={tallesDisponibles && tallesDisponibles.includes('M')}
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
                          checked={tallesDisponibles && tallesDisponibles.includes('L')}
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
                          checked={tallesDisponibles && tallesDisponibles.includes('XL')}
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
                          checked={tallesDisponibles && tallesDisponibles.includes('XXL')}
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
                          checked={tallesDisponibles && tallesDisponibles.includes('XXXL')}
                        />
                        <label className="form-check-label" htmlFor="XXXL">
                          XXXL
                        </label>
                      </div>

                    </section>
                  }

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
                                      onChangeInputsSelected(e),
                                        checkedBoxesHandler(corr.id)
                                    }}
                                    checked={checkedBoxes && checkedBoxes[corr.id]}
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
                                      value={inputsSelected.find(el => el.input.id == corr.id)?.cantidad || inputsSelected.find(el => el.input.id == corr.id)?.cantidad}
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
                                      onChangeInputsSelected(e),
                                        checkedBoxesHandler(arg.id)
                                    }}
                                    checked={checkedBoxes && checkedBoxes[arg.id]}
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
                                      value={inputsSelected.find(el => el.input.id == arg.id)?.cantidad}
                                      // value={modelForm.detalleInsumos.find(el => el.input.id == corr.id)?.cantidad || 0}
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
                                    checked={checkedBoxes && checkedBoxes[elastico.id]}
                                  />
                                  <label className="form-check-label" htmlFor={`flexCheckDefault${elastico.id}`}>
                                    {elastico.nombre}
                                  </label>
                                </div>
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
                                            value={inputsSelected && inputsSelected.find(el => el.input.id === elastico.id)?.cantidadPorTalle[t]}
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
                                    value={gancho.id}
                                    id={`gancho${gancho.id}`}
                                    onChange={(e) => {
                                      onChangeInputsSelected(e)
                                      checkedBoxesHandler(gancho.id)
                                    }}
                                    checked={checkedBoxes && checkedBoxes[gancho.id]}
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
                                      // value={correderasSelected.cantidad}
                                      value={inputsSelected.find(el => el.input.id == gancho.id)?.cantidad}
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
                                    onChangeInputsSelected(e)
                                    checkedBoxesHandler(etiqueta.id)
                                  }}
                                  checked={checkedBoxes && checkedBoxes[etiqueta.id]}
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
                                      value={inputsSelected.find(el => el.input.id == etiqueta.id)?.cantidad}
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
                                  value={aplique.id}
                                  id={`aplique${aplique.id}`}
                                  onChange={(e) => {
                                    onChangeInputsSelected(e)
                                    checkedBoxesHandler(aplique.id)
                                  }}
                                  checked={checkedBoxes && checkedBoxes[aplique.id]}
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
                                      value={inputsSelected.find(el => el.input.id == aplique.id)?.cantidad}
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
                          checked={tirasChecked && tirasChecked[tira.id]}
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
                                  // value={cantTirasValueSearcher(tira.id, t)}
                                  value={detallesTiraModelo.find(el => el.tira.id == tira.id)?.tirasPorTalle[t]}
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

                  <Input
                    name='detalle'
                    value={modelForm.detalle}
                    type='textarea'
                    placeHolder="Detalle"
                    onChangeInput={onChange}
                  />

                </form>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button type="submit" className="btn btn-primary" onClick={onSubmit}>{!modelForm.id ? `Crear Modelo` : 'Actualizar Modelo'}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

