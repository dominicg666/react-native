import {
    COUNTRY_LIST_REQUEST,
    COUNTRY_LIST_SUCCESS,
    COUNTRY_LIST_FAILURE,

    STATE_LIST_REQUEST,
    STATE_LIST_SUCCESS,
    STATE_LIST_FAILURE
} from "./constants";
import {
    baseUrl,
    countries,
    states
} from "../Constants/Api";

import axios from "axios";


export const statesRequest = () => {
    return { type: STATE_LIST_REQUEST };
}

export const statesSuccess = (json) => {
    return { type: STATE_LIST_SUCCESS, payload: json };
}

export const statesFailure = (json) => {
    return { type: STATE_LIST_FAILURE, payload: json };
}


export const requestStates = (token) => {
    return async dispatch => {
        dispatch(statesRequest());
        await axios({
            method: "get",
            url: baseUrl + states,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.data.status) {
                    dispatch(statesSuccess(response.data.data));
                } else {
                    dispatch(statesFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(statesFailure(error.response.data.message))
            });
    };
};

export const countriesRequest = () => {
    return { type: COUNTRY_LIST_REQUEST };
}

export const countriesSuccess = (json) => {
    return { type: COUNTRY_LIST_SUCCESS, payload: json };
}

export const countriesFailure = (json) => {
    return { type: COUNTRY_LIST_FAILURE, payload: json };
}


export const requestCountries = (token) => {
    return async dispatch => {
        dispatch(countriesRequest());
        await axios({
            method: "get",
            url: baseUrl + countries,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.data.status) {
                    dispatch(countriesSuccess(response.data.data));
                } else {
                    dispatch(countriesFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                dispatch(countriesFailure(error.response.data.message))
            });
    };
};