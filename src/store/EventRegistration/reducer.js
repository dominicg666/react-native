import {
    ADD_ATTENDEES,
    REMOVE_ATTENDEES,
    GET_ATTENDEES,
    UPDATE_ATTENDEES,
    CLEAR_ATTENDEES,

    EVENT_REGISTRATION_REQUEST,
    EVENT_REGISTRATION_SUCCESS,
    EVENT_REGISTRATION_FAILURE
} from "./constants";
import ItemManager from "./itemManagers/itemManager";


const initialState = {
    isRequest: false,
    attendeesData: [],
    attendee: null,
    editItemIndex: null,
    data: null
};


const EventRegistrationReducer = (state = initialState, action) => {
    let attendeesData = new ItemManager(state.attendeesData);
    switch (action.type) {
        case ADD_ATTENDEES:
            return {
                ...state,
                isRequest: true,
                attendeesData: attendeesData.addItem(action.payload.attendee)
            };
        case REMOVE_ATTENDEES:
            return {
                ...state,
                isRequest: false,
                attendeesData: attendeesData.deleteItem(action.payload.index)
            };
        case GET_ATTENDEES:
            return {
                ...state,
                isRequest: false,
                attendee: attendeesData.getItem(action.payload.index),
                editItemIndex: action.payload.index
            };
        case UPDATE_ATTENDEES:
            return {
                ...state,
                isRequest: false,
                attendeesData: attendeesData.updateItem(action.payload.attendee, action.payload.index)
            };
        case CLEAR_ATTENDEES:
            return {
                ...state,
                isRequest: false,
                attendeesData: attendeesData.clearAll()
            };

        case EVENT_REGISTRATION_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case EVENT_REGISTRATION_SUCCESS:
            return {
                ...state,
                isRequest: false,
                data: action.payload
            };
        case EVENT_REGISTRATION_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        default:
            return state;
    }
};
export default EventRegistrationReducer;