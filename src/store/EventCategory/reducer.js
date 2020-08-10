import {
    EVENT_CATEGORY_LIST_REQUEST,
    EVENT_CATEGORY_LIST_SUCCESS,
    EVENT_CATEGORY_LIST_FAILURE,

    EVENTS_BY_CATEGORY_LIST_REQUEST,
    EVENTS_BY_CATEGORY_LIST_SUCCESS,
    EVENTS_BY_CATEGORY_LIST_FAILURE
} from "./constants";

const initialState = {
    isRequest: false,
    data: [],
    eventList: {}
};


const EventCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENT_CATEGORY_LIST_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case EVENT_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                isRequest: false,
                data: action.payload.EventCategory
            };
        case EVENT_CATEGORY_LIST_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        case EVENTS_BY_CATEGORY_LIST_REQUEST:
            state.eventList[`routekey_${action.payload.key}`] = {};
            state.eventList[`routekey_${action.payload.key}`]['data'] = [];
            state.eventList[`routekey_${action.payload.key}`]['isRequest'] = true
            return { ...state };
        case EVENTS_BY_CATEGORY_LIST_SUCCESS:
            state.eventList[`routekey_${action.payload.key}`]['data'] = action.payload.EventList;
            state.eventList[`routekey_${action.payload.key}`]['isRequest'] = false
            return { ...state }
        case EVENTS_BY_CATEGORY_LIST_FAILURE:
            state.eventList[`routekey_${action.payload.key}`]['isRequest'] = false
            return { ...state }

        default:
            return state;
    }
};
export default EventCategoryReducer;