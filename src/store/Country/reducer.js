import {
    COUNTRY_LIST_REQUEST,
    COUNTRY_LIST_SUCCESS,
    COUNTRY_LIST_FAILURE,

    STATE_LIST_REQUEST,
    STATE_LIST_SUCCESS,
    STATE_LIST_FAILURE
} from "./constants";

const initialState = {
    isRequest: false,
    countryList: [],
    stateList: []
};


const CountryReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRY_LIST_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case COUNTRY_LIST_SUCCESS:
            return {
                ...state,
                isRequest: false,
                countryList: action.payload.country
            };
        case COUNTRY_LIST_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        case STATE_LIST_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case STATE_LIST_SUCCESS:
            return {
                ...state,
                isRequest: false,
                stateList: action.payload.state
            };
        case STATE_LIST_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        default:
            return state;
    }
};
export default CountryReducer;