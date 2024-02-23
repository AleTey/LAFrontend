export const correderaReducer = (state = [], action) => {

  switch (action.type) {


    case 'GET_ALL_CORREDERAS':
      return action.payload;


    case "ADD_CORREDERA":
      return [
        ...state,
        action.payload
      ];

    case "UPDATE_CORREDERA":
      return state.map(corr => {
        if (corr.id === action.payload.id) {
          return { ...action.payload }
        }
        return corr;
      })



    case "DELETE_CORREDERA":

      return [...state.filter(corr => corr.id !== action.payload)]

    default:
      return state;
  }

}