export const loteReducer = (state = [], action) => {
  
  switch (action.type) {
    case "GET_ALL_LOTES":
      return action.payload;

    case "ADD_LOTE":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_LOTE":
      return [
        ...state.map(lote => {
          if (lote.id === action.payload.id) {
            return { ...action.payload }
          }
          return lote;
        })
      ];

    case "DELETE_LOTE":
      return state.filter(lote => lote.id !== action.payload)

    default:
      return state;
  }
}