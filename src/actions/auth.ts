import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAIL, 
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    AUTHENTICATED_FAIL, 
    AUTHENTICATED_SUCCESS, 
    REFRESH_SUCCESS, 
    REFRESH_FAIL } from "./types";



export const load_user = () => async (dispatch: any)  => {
    try {
        const res = await fetch('/api/accounts/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};

export const check_auth_status = () => async (dispatch:any) => {
    try {
        const res = await fetch('/api/accounts/verify', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (res.status === 200) {
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const request_refresh = () => async (dispatch: any) => {
    try {
        const res = await fetch('/api/accounts/refresh', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (res.status === 200) {
            dispatch({
                type: REFRESH_SUCCESS
            });
            dispatch(check_auth_status());
        } else {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: REFRESH_FAIL
        });
    }
};

export const login = (username: string, password: string) => async (dispatch: any) => {
    const body = JSON.stringify({
        username,
        password
    });

    try {
        const res = await fetch('/api/accounts/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout = () => async (dispatch: any) => {
    try {
        const response = await fetch(`api/accounts/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL
        })
    }
}