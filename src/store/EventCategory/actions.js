import {
    EVENT_CATEGORY_LIST_REQUEST,
    EVENT_CATEGORY_LIST_SUCCESS,
    EVENT_CATEGORY_LIST_FAILURE,

    EVENTS_BY_CATEGORY_LIST_REQUEST,
    EVENTS_BY_CATEGORY_LIST_SUCCESS,
    EVENTS_BY_CATEGORY_LIST_FAILURE
} from "./constants";
import {
    baseUrl,
    eventCategory,
    eventsByCategory
} from "../Constants/Api";

import { getUser, setUser } from '../../Lib/asyncStorageModule';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";

export const eventsByCategoryRequest = (json) => {
    return { type: EVENTS_BY_CATEGORY_LIST_REQUEST, payload: json };
}

export const eventsByCategorySuccess = (json) => {
    return { type: EVENTS_BY_CATEGORY_LIST_SUCCESS, payload: json };
}

export const eventsByCategoryFailure = (json) => {
    return { type: EVENTS_BY_CATEGORY_LIST_FAILURE, payload: json };
}


export const requestEventsByCategory = (token, data) => {

    return async dispatch => {
        dispatch(eventsByCategoryRequest({ key: data.EventCategoryId }));
        await axios({
            method: "get",
            url: baseUrl + eventsByCategory,
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: data
        })
            .then(async (response) => {
                if (response.data.status) {
                    dispatch(eventsByCategorySuccess({ key: data.EventCategoryId, ...response.data.data }));
                } else {
                    dispatch(eventsByCategoryFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(eventsByCategoryFailure(error.response.data.message))
            });
    };
};


export const eventCategoryRequest = () => {
    return { type: EVENT_CATEGORY_LIST_REQUEST };
}

export const eventCategorySuccess = (json) => {
    return { type: EVENT_CATEGORY_LIST_SUCCESS, payload: json };
}

export const eventCategoryFailure = (json) => {
    return { type: EVENT_CATEGORY_LIST_FAILURE, payload: json };
}


export const requestEventCategory = (token) => {

    return async dispatch => {
        dispatch(eventCategoryRequest());
        await axios({
            method: "get",
            url: baseUrl + eventCategory,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.data.status) {
                    dispatch(eventCategorySuccess(response.data.data));
                } else {
                    dispatch(eventCategoryFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(eventCategoryFailure(error.response.data.message))
            });
    };
};