import { useState } from "react"
import { InputModalContext } from "./InputModalContext"

export const InputModalProvider = ({ children }) => {

  const [inputModalIsOpen, setInputModalIsOpen] = useState();
  const [selectedModal, setSelectedModal] = useState("");
  const [inputDbHasChanged, setInputDbHasChanged] = useState("")

  const toggle = () => {
    setInputModalIsOpen(!inputModalIsOpen);
  }

  const modalSelectionHandler = (modal) => {
    setSelectedModal(modal);
  }

  return (
    <InputModalContext.Provider value={
      {
        inputModalIsOpen,
        toggle,
        selectedModal,
        modalSelectionHandler,
        inputDbHasChanged,
        setInputDbHasChanged
      }
    }>
      {children}
    </InputModalContext.Provider>
  )

}