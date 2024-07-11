import { useContext } from "react"
import { OrderContext } from "../context/OrdersContext"

export const useOrders = () => {

  const { orderList, setOrderList } = useContext(OrderContext);

  const onAddOrderList = (input) => {
    if (!orderList.some(inp => inp.id === input.id && inp.nombre === input.nombre)) {
      setOrderList([
        ...orderList,
        input
      ])
    }
  }

  const onRemoveFromOrderList = (input) => {
    setOrderList(orderList.filter(i => i.id !== input.id && i.nombre !== input.nombre))
  }


  return {
    orderList,
    setOrderList,
    onAddOrderList,
    onRemoveFromOrderList
  }

}