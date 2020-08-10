import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,

    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAILURE
} from "./constants";

const initialState = {
    isRequest: false,
    data: null,
    otpData: null
};


const AuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isRequest: false,
                data: action.payload
            };
        case AUTHENTICATION_FAILURE:
            return {
                ...state,
                isRequest: false,
            };

        case OTP_VERIFY_REQUEST:
            return {
                ...state,
                isRequest: true,
            };
        case OTP_VERIFY_SUCCESS:
            return {
                ...state,
                isRequest: false,
                otpData: action.payload
            };
        case OTP_VERIFY_FAILURE:
            return {
                ...state,
                isRequest: false,
            };
        default:
            return state;
    }
};
export default AuthenticationReducer;