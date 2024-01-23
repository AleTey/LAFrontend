export const suppliersReducer = (state = [], action) => {

  switch (action.type) {
    case "ADD-SUPPLIERS":
      return [
        ...state,
        action.payload
      ];
      
    case "EDIT-SUPPLIER":
      return state.map(s => {
        if (s.id == action.payload.id) {
          return {
            ...action.payload
          }
        }
        return s;
      });

    case "REMOVE-SUPPLIER":
      return state.filter(sup => sup.id !== action.payload);

    case "LOADING-SUPPLIERS":
      return action.payload;
    default:
      return state;
  }
}