import { useContext, useState } from "react"
import { InputModalContext } from "../../context/InputModalContext"

export const useInputModal = () => {

  return useContext(InputModalContext);
}