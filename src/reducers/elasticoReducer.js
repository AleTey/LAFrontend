export const elasticoReducer = (state = [], action) => {


  switch (action.type) {

    case "GET_ALL_ELASTICOS":

      return action.payload;

    case "ADD_ELASTICO":

      return [
        ...state,
        action.payload
      ];

    case "UPDATE_ELASTICO":
      return state.map(el => {
        if (el.id === action.payload.id) {
          return { ...action.payload }
        }
        return el;
      })

    case "DELETE_ELASTICO":
      return [...state.filter(el => el.id !== action.payload)];

    default:
      return state;
  }
}