import { useEffect, useState, useContext } from 'react';
import '../acss/newCollection.css';
import { useModel } from '../hooks/useModel';
import { ModelsCard } from './ModelsCard';
import { ModelSimplestCard } from './ModelSimplesCard';
import { AuthContext } from '../auth/context/AuthContext';

export const ModelsNewCollection = () => {
  const { models, findAllPageModel } = useModel();
  const [modelsToPick, setModelsToPick] = useState([]);

  const [paginator, setPaginator] = useState({});
  const [modelsSelected, setModelsSelected] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    findAllPageModel(page, setPaginator);
  }, [, page]);

  useEffect(() => {
    setModelsToPick(
      models.map(m => {
        if (modelsSelected.includes(m)) {
          return {
            ...m,
            selected: true
          }
        }
        return {
          ...m,
          selected: false
        }
      })

    )
  }, [models, modelsSelected])

  const startDrag = (e, model) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('modelId', model.id);
    // console.log(e.dataTransfer.getData('modelId'));
    console.log(model);
  };

  const dragInOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const modelId = e.dataTransfer.getData('modelId');
    console.log(modelId);

    const mod = models.find(m => m.id == modelId);
    console.log(mod)
    if (!mod.selected) {
      setModelsSelected(prevSelected => [...prevSelected, mod]);
    }
    else {
      setModelsSelected(
        modelsSelected.filter(m => m.id != modelId)
      )
      setModelsToPick(
        modelsToPick.map(m => {
          if (m.id == mod.id) {
            return {
              ...m,
              selected: false
            }
          }
        })
      )
    }
  };

  const onClose = (id) => {
    setModelsSelected(
      modelsSelected.filter(m => m.id != id)
    )
    // setModelsToPick(
    //   modelsToPick.map(m => {
    //     if (m.id == id) {
    //       return {
    //         ...m,
    //         selected: false
    //       }
    //     }
    //   })
    // )
  }

  return (
    <>
      <h3 draggable>DragAndDrop</h3>
      <div className='d-flex column'>
        <div className="container d-flex column gap-2">
          <div
            className="d-flex justify-content squad"
            onDragOver={dragInOver}
            onDrop={onDrop}
          >
            {modelsToPick?.map(model => (
              <div
                className="container draggable"
                key={model.id}
                draggable={model.selected === false}
                onDragStart={(e) => startDrag(e, model)}
              >
                <ModelSimplestCard model={model} />
              </div>
            ))}
          </div>
        </div>

        <div className="container d-flex column gap-2">
          <div
            className="d-flex justify-content squad"
            onDragOver={dragInOver}
            onDrop={onDrop}
          >
            {modelsSelected?.map(selected => (
              <div
                className="container"
                key={selected.id}
                // draggable
                onDragStart={(e) => startDrag(e, selected)}
              >
                <ModelSimplestCard
                  model={selected}
                  closeable={true}
                  onClose={onClose}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};