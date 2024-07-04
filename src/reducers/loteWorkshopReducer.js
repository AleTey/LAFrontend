export const loteWorkshopReducer = (state = [], action) => {

  switch (action.type) {
    case "GET_ALL_WORKSHOP_LOTES":
      return action.payload;

    case "ADD_WORKSHOP_LOTE":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_WORKSHOP_LOTE":
      return state.map(p => {
        if (p.id === action.payload.id) {
          return { ...action.payload }
        }
        return p;
      })

    case "REMOVE_WORKSHOP_LOTE":
      return [
        ...state.filter(p => p.id !== action.payload)
      ]

    default:
      return state;
  }
}