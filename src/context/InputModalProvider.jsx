import { useState } from "react"
import { InputModalContext } from "./InputModalContext"

export const InputModalProvider = ({ children }) => {

  const [inputModalIsOpen, setInputModalIsOpen] = useState();
  const [selectedModal, setSelectedModal] = useState("");
  const [correderaWasAdded, setCorrederaWasAdded] = useState("");
  const [correderaWasDeleted, setCorrederaWasDeleted] = useState(false);
  const [correderaWasEdited, setCorrederaWasEdited] = useState(false);

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
        correderaWasAdded,
        setCorrederaWasAdded,
        correderaWasDeleted,
        setCorrederaWasDeleted,
        correderaWasEdited, setCorrederaWasEdited
      }
    }>
      {children}
    </InputModalContext.Provider>
  )

}