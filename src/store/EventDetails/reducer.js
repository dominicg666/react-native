import {
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAILURE,
} from "./constants";

const initialState = {
    isRequest: false,
    data: [],
};


const EventDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENT_DETAILS_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                isRequest: false,
                data: action.payload
            };
        case EVENT_DETAILS_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        default:
            return state;
    }
};
export default EventDetailsReducer;