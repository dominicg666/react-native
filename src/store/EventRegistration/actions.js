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
import {
    baseUrl,
    eventRegister
} from "../Constants/Api";
import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";

export const addAttendee = (attendee) => {
    return { type: ADD_ATTENDEES, payload: { attendee } };
}
export const removeAttendee = (index) => {
    return { type: REMOVE_ATTENDEES, payload: { index } };
}
export const getAttendee = (index) => {
    return { type: GET_ATTENDEES, payload: { index } };
}
export const updateAttendee = (attendee, index) => {
    return { type: UPDATE_ATTENDEES, payload: { attendee, index } };
}
export const clearAttendees = () => {
    return { type: CLEAR_ATTENDEES };
}

export const eventRegistrationRequest = () => {
    return { type: EVENT_REGISTRATION_REQUEST };
}

export const eventRegistrationSuccess = (json) => {
    return { type: EVENT_REGISTRATION_SUCCESS, payload: json };
}

export const eventRegistrationFailure = (json) => {
    return { type: EVENT_REGISTRATION_FAILURE, payload: json };
}


export const eventRegistration = (token, data) => {

    return async dispatch => {
        dispatch(eventRegistrationRequest());
        await axios({
            method: "post",
            url: baseUrl + eventRegister,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.data.status) {
                    showMessage({
                        message: response.data.data,
                        //description: "This is our second message",
                        type: "success",
                    });
                    dispatch(eventRegistrationSuccess(response.data));
                } else {
                    showMessage({
                        message: response.data.message,
                        //description: "This is our second message",
                        type: "danger",
                    });
                    dispatch(eventRegistrationFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                showMessage({
                    message: error.response.data.message,
                    //description: "This is our second message",
                    type: "danger",
                });
                dispatch(eventRegistrationFailure(error.response.data.message))
            });
    };
};