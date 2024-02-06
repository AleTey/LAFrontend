export const fabricReducer = (state = [], action) => {

  switch (action.type) {
    case "GET_ALL_FABRICS":

      return action.payload;

    case "ADD_FABRIC":

      return [
        ...state,
        action.payload
      ]

    case "EDIT_FABRIC":
      console.log(action.payload)
      return state.map(fab => {
        if (fab.id === action.payload.id) {
          return {
            ...action.payload
          }
        }
        return fab;
      })

    case "REMOVE_FABRIC":
      return state.filter(fab => fab.id !== action.payload);

    default:
      return state;
  }
}