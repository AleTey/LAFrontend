export const loteControlReducer = (state = [], action) => {
  
  switch (action.type) {
    case "GET_ALL_CONTROL_LOTES":
      return action.payload;

    case "ADD_CONTROL_LOTE":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_CONTROL_LOTE":
      return state.map(lote => {
        if (lote.id === action.payload.id) {
          return { ...action.payload };
        }
        return lote;
      })

    case "REMOVE_CONTROL_LOTE":
      return state.filter(lote => lote.id !== action.payload);


    default:
      return state;
  }
}