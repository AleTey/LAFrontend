import { useSuppliers } from "../hooks/useSuppliers"
import { SupplierContext } from "./SupplierContext"

export const SupplierProvider = ({ children }) => {

  const { suppliers } = useSuppliers();
  const data = { suppliers }

  return (
    <SupplierContext.Provider value={data}>
      {children}
    </SupplierContext.Provider>
  );

}