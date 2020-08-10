import {
    MY_EVENT_CATEGORY_LIST_REQUEST,
    MY_EVENT_CATEGORY_LIST_SUCCESS,
    MY_EVENT_CATEGORY_LIST_FAILURE,
} from "./constants";

const initialState = {
    isRequest: false,
    data: [],
};


const MyEventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_EVENT_CATEGORY_LIST_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case MY_EVENT_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                isRequest: false,
                data: action.payload
            };
        case MY_EVENT_CATEGORY_LIST_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        default:
            return state;
    }
};
export default MyEventsReducer;