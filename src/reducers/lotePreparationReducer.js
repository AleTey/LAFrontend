export const lotePreparationReducer = (state = [], action) => {
  
  switch (action.type) {
    case "GET_ALL_PREPARATION_LOTES":
      return action.payload;

    case "ADD_PREPARATION_LOTE":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_PREPARATION_LOTE":
      return state.map(lote => {
        if (lote.id === action.payload.id) {
          return { ...action.payload };
        }
        return lote;
      })

    case "REMOVE_PREPARATION_LOTE":
      return state.filter(lote => lote.id !== action.payload);


    default:
      return state;
  }
}