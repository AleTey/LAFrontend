export const loteCutReducer = (state = [], action) => {

  switch (action.type) {
    case "GET_ALL_CUT_LOTES":
      return action.payload;

    case "ADD_CUT_LOTE":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_CUT_LOTE":
      return state.map(p => {
        if (p.id === action.payload.id) {
          return { ...action.payload }
        }
        return p;
      })

    case "DELETE_CUT_LOTE":
      return [
        ...state.filter(p => p.id !== action.payload)
      ]

    default:
      return state;
  }
}