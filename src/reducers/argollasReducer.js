export const argollasReducer = (state = [], action) => {

  switch (action.type) {
    case "ADD_ALL_ARGOLLAS":

      return action.payload;

    default:
      return state;
  }

}