export const loteQueueReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_QUEUE_LOTES":
      return action.payload;

    case "ADD_QUEUE_LOTE":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_QUEUE_LOTE":
      return state.map(p => {
        if (p.id === action.payload.id) {
          return { ...action.payload }
        }
        return p;
      })

    case "DELETE_QUEUE_LOTE":
      return [
        ...state.filter(p => p.id !== action.payload)
      ]

    default:
      return state;
  }
}