import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../context/OrdersContext"
import { OrderCardWithImg } from "../components/OrderCardWithImg";
import { OrderCardNoImg } from "../components/OrederCardNoImg";

export const Orders = () => {

  const [ordersGroupBySupplier, setOrdersGroupBySupplier] = useState({});

  const [activeSupplier, setActiveSupplier] = useState("");

  const { orderList,
    setOrderList } = useContext(OrderContext);

  useEffect(() => {
    const groupInputsByProveedor = (inputs) => {
      return inputs.reduce((acc, input) => {
        const proveedorId = input.proveedor.id;
        if (!acc[proveedorId]) {
          acc[proveedorId] = {
            proveedor: input.proveedor,
            inputs: []
          };
        }
        acc[proveedorId].inputs.push(input);
        return acc;
      }, {});
    };
    // if (orderList.length > 0) {

    setOrdersGroupBySupplier(groupInputsByProveedor(orderList));
    // }
    setActiveSupplier(Object.keys(ordersGroupBySupplier)[0]);
    console.log(Object.keys(ordersGroupBySupplier)[0])
  }, [orderList])

  useEffect(() => {
    const firstSupplierKey = Object.keys(ordersGroupBySupplier)[0];
    const firstSupplierGroup = ordersGroupBySupplier[firstSupplierKey]
    if (firstSupplierGroup) {
      setActiveSupplier(firstSupplierGroup.proveedor.empresa);
    }
    // console.log(firstSupplierGroup.proveedor.empresa)
  }, [ordersGroupBySupplier])

  const onChangeSupplier = (group) => {
    setActiveSupplier(group.proveedor.empresa)
  }

  const textEncoder = (inputs) => {
    let originalText = "Hola! te consulto por stock de los siguientes items";
    let urlText = "";

    inputs.map(input => (
      originalText = originalText + ", " + input.codigo
    ))
    urlText = encodeURI(originalText)
    return urlText;
  }

  return (
    <div className="container-sm">
      <h3 className="my-3">Pedidos</h3>
      <hr />

      <ul className="nav nav-tabs" id="myTab" role="tablist">

        {ordersGroupBySupplier && Object.entries(ordersGroupBySupplier).map(([suppId, group]) => (
          // <p key={suppId}>{group.proveedor.empresa}</p>
          <li key={suppId} className="nav-item" role="presentation">
            <button onClick={() => onChangeSupplier(group)} className={`nav-link ${group.proveedor.empresa === activeSupplier && 'active'}`} id={suppId} data-bs-toggle="tab" data-bs-target={`#${group.proveedor.empresa}`} type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">{group.proveedor.empresa}</button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="myTabContent">

        {ordersGroupBySupplier && Object.entries(ordersGroupBySupplier).map(([suppId, group]) => (
          <div key={suppId} className={`tab-pane fade ${group.proveedor.empresa === activeSupplier && 'show active'}`} id={suppId} role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
            <div className="container d-flex column gap-3 m-3">


              {group.inputs.map(input => (
                <div key={input.id} >
                  {
                    input.img ?
                      <OrderCardWithImg
                        input={input}
                      />
                      :
                      <div>
                        <OrderCardNoImg
                          input={input}
                        />
                      </div>
                  }
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/${group.proveedor.caracteristica}${group.proveedor.celContacto}?text=${textEncoder(group.inputs)}`}

              target="_blank"
            >
              {/* <img src={group.inputs[0].img} alt="" /> */}
              <button
                className="btn"
              // onClick={() => encoderText(group.inputs)}
              >
                <img src="src/assets/whatsApp.png" alt="" />
              </button>
            </a>


          </div>

        ))}
      </div>

    </div>
  )
}