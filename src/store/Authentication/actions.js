import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,

    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAILURE
} from "./constants";
import {
    baseUrl,
    login,
    otpVerify
} from "../Constants/Api";

import { getUser, setUser } from '../../Lib/asyncStorageModule';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";

export const otpVerifyRequest = () => {
    return { type: OTP_VERIFY_REQUEST };
}

export const otpVerifySuccess = (json) => {
    return { type: OTP_VERIFY_SUCCESS, payload: json };
}

export const otpVerifyFailure = (json) => {
    return { type: OTP_VERIFY_FAILURE, payload: json };
}


export const requestOtpVerify = (DATA, NavigationAction) => {

    return async dispatch => {
        dispatch(otpVerifyRequest());
        await axios
            .post(baseUrl + otpVerify, DATA)
            .then(async (response) => {
                if (response.data.status) {
                    await dispatch(otpVerifySuccess(response.data));
                    await setUser(response.data.data);
                    NavigationAction.navigate("App");
                } else {
                    showMessage({
                        message: response.data.message,
                        //description: "This is our second message",
                        type: "danger",
                    });
                    dispatch(otpVerifyFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                
                showMessage({
                    message: error.response.data.message,
                    //description: "This is our second message",
                    type: "danger",
                });
                dispatch(otpVerifyFailure(error.response.data.message))
            });
    };
};

export const loginRequest = () => {
    return { type: AUTHENTICATION_REQUEST };
}

export const loginSuccess = (json) => {
    return { type: AUTHENTICATION_SUCCESS, payload: json };
}

export const loginFailure = (json) => {
    return { type: AUTHENTICATION_FAILURE, payload: json };
}


export const requestLogin = (DATA, NavigationAction) => {

    return async dispatch => {
        dispatch(loginRequest());
        await axios
            .post(baseUrl + login, DATA)
            .then(async (response) => {
                if (response.data.status) {
                    await dispatch(loginSuccess({ OtpCode: response.data.data.OtpCode, MobileNumber: DATA.MobileNumber }));
                    NavigationAction.navigate("OtpScreen");
                } else {
                    showMessage({
                        message: response.data.message,
                        //description: "This is our second message",
                        type: "danger",
                    });
                    dispatch(loginFailure(response.data.message))
                }
            })
            .catch(async (error) => {
                showMessage({
                    message: error.response.data.message,
                    //description: "This is our second message",
                    type: "danger",
                });
                dispatch(loginFailure(error.response.data.message))
            });
    };
};