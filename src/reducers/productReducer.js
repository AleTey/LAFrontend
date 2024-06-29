export const productReducer = (state = [], action) => {

  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return action.payload;

    case "ADD_PRODUCT":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_PRODUCT":
      return state.map(p => {
        if (p.id === action.payload.id) {
          return { ...action.payload }
        }
        return p;
      })

    case "DELETE_PRODUCT":
      return [
        ...state.filter(p => p.id !== action.payload)
      ]

    default:
      return state;
  }
}