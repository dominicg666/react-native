import {
    SEARCH_LIST_REQUEST,
    SEARCH_LIST_SUCCESS,
    SEARCH_LIST_FAILURE
} from "./constants";

const initialState = {
    isRequest: false,
    data: null,
};


const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_LIST_REQUEST:
            return {
                ...state,
                isRequest: true,
                
            };
        case SEARCH_LIST_SUCCESS:
            return {
                ...state,
                isRequest: false,
                data: action.payload.EventList
            };
        case SEARCH_LIST_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        default:
            return state;
    }
};
export default SearchReducer;