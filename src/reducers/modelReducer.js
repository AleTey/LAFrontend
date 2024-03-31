export const modelReducer = (state = [], action) => {

  switch (action.type) {
    case "GET_ALL_MODELS":
      return action.payload;

    case "ADD_MODEL":
      return [
        ...state,
        action.payload
      ]

    case "UPDATE_MODEL":
      return state.map(model => {
        if (model.id === action.payload.id) {
          return { ...action.payload }
        }
        return model
      })

    case "DELETE_MODEL":
      return [
        ...state.filter(model => model.id !== action.payload)
      ]

    default:
      return state;
  }
}