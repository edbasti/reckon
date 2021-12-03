export const reducer = (state = {stocks: []}, action) => {
  switch (action.type) {
    case "GET_STOCKS":
      return {
        ...state,
        stocks: action.stocks
      };
    default:
      return state;
  }
};