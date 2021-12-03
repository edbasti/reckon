import axios from 'axios';

export const getStocks = () => {
    return (dispatch) => {
        axios.get('/stock-pricing')
            .then(response => {
            dispatch({
                type: "GET_STOCKS",
                stocks: response.data
            });
        })
    }
}