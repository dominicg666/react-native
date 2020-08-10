import {
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAILURE,
} from "./constants";
import {
    baseUrl,
    eventDetails
} from "../Constants/Api";

import { getUser, setUser } from '../../Lib/asyncStorageModule';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";

export const eventDetailsRequest = () => {
    return { type: EVENT_DETAILS_REQUEST };
}

export const eventDetailsSuccess = (json) => {
    return { type: EVENT_DETAILS_SUCCESS, payload: json };
}

export const eventDetailsFailure = (json) => {
    return { type: EVENT_DETAILS_FAILURE, payload: json };
}


export const requestEventDetals = (token,id) => {

    return async dispatch => {
        dispatch(eventDetailsRequest());
        await axios({
            method: "get",
            url: baseUrl + eventDetails+id,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.data.status) {
                    dispatch(eventDetailsSuccess(response.data.data));
                } else {
                    dispatch(eventDetailsFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(eventDetailsFailure(error.response.data.message))
            });
    };
};