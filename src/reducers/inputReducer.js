export const inputReducer = (state = [], action) => {

  switch (action.type) {
    case "GET_ALL":
      return action.payload;

    case "ADD":
      return [
        ...state,
        action.payload
      ]

    case "UPDATE":
      return state.map(input => {
        if (input.id === action.payload.id) {
          return { ...action.payload }
        }
        return input;
      })

    case "DELETE":
      return [...state.filter(input => input.id !== action.payload)];

    default:
      return state;
  }

}