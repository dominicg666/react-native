import {
    MY_EVENT_CATEGORY_LIST_REQUEST,
    MY_EVENT_CATEGORY_LIST_SUCCESS,
    MY_EVENT_CATEGORY_LIST_FAILURE,
} from "./constants";
import {
    baseUrl,
    myEvents
} from "../Constants/Api";

import { getUser, setUser } from '../../Lib/asyncStorageModule';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";

export const myEventsRequest = () => {
    return { type: MY_EVENT_CATEGORY_LIST_REQUEST };
}

export const myEventsSuccess = (json) => {
    return { type: MY_EVENT_CATEGORY_LIST_SUCCESS, payload: json };
}

export const myEventsFailure = (json) => {
    return { type: MY_EVENT_CATEGORY_LIST_FAILURE, payload: json };
}


export const requestMyEvents = (token) => {

    return async dispatch => {
        dispatch(myEventsRequest());
        await axios({
            method: "get",
            url: baseUrl + myEvents,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.data.status) {
                    dispatch(myEventsSuccess(response.data.data));
                } else {
                    dispatch(myEventsFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(myEventsFailure(error.response.data.message))
            });
    };
};