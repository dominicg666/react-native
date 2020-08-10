import {
    SEARCH_LIST_REQUEST,
    SEARCH_LIST_SUCCESS,
    SEARCH_LIST_FAILURE
} from "./constants";
import {
    baseUrl,
    eventsByCategory
} from "../Constants/Api";

import axios from "axios";

export const searchListRequest = () => {
    return { type: SEARCH_LIST_REQUEST };
}

export const searchListSuccess = (json) => {
    return { type: SEARCH_LIST_SUCCESS, payload: json };
}

export const searchListFailure = (json) => {
    return { type: SEARCH_LIST_FAILURE, payload: json };
}


export const requestSearchList = (token, data) => {

    return async dispatch => {
        dispatch(searchListRequest());
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
                    dispatch(searchListSuccess(response.data.data));
                } else {
                    dispatch(searchListFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(searchListFailure(error.response.data.message))
            });
    };
};