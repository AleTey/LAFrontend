import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const [orderList, setOrderList] = useState([]);

  // const [fabricsAddedList, setFabricsAddedList] = useState([]);

  return (
    <OrderContext.Provider
      value={{
        orderList,
        setOrderList
      }}>
      {children}
    </OrderContext.Provider>
  )
}