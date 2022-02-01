import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAIL, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAIL, 
    REFRESH_FAIL, 
    REFRESH_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    PASSWORD_RECOVERY_SUCCESS,
    PASSWORD_RECOVERY_FAIL,
    PASSWORD_SET_SUCCESS,
    PASSWORD_SET_FAIL,
} from "../actions/types";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    register_success: false
};

const authReducer = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        case LOGOUT_FAIL: 
            return {
                ...state
            }
        
        case PASSWORD_RECOVERY_SUCCESS: 
            return {
                ...state,
                emailSent: true
            }
        case PASSWORD_RECOVERY_FAIL: 
            return {
                ...state,
                emailSent: false
            }
        case PASSWORD_SET_SUCCESS:
            return {
                ...state,
                passwordSet: true
            }
        case PASSWORD_SET_FAIL:
            return {
                ...state,
                passwordSet: false
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case REFRESH_SUCCESS:
            return {
                ...state,
            }
        case REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

export default authReducer;