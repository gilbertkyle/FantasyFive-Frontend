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
    REFRESH_FAIL, 
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    PASSWORD_RECOVERY_SUCCESS,
    PASSWORD_RECOVERY_FAIL,
    PASSWORD_SET_SUCCESS,
    PASSWORD_SET_FAIL
} from "./types";

interface registerProps {
    username: string,
    email: string,
    password: string
}

export const reset_password = (password: string, token: string) => async (dispatch: any) => {
    const body = JSON.stringify({password, token});
    try {
        const res = await fetch(`/api/accounts/password-set/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: body
        });
        if (res.status === 200) {
            dispatch({
                type: PASSWORD_SET_SUCCESS
            })
        } else {
            dispatch({
                type: PASSWORD_SET_FAIL
            })
        }

    } catch (error: any) {
        dispatch({
            type: PASSWORD_SET_FAIL
        })
    }
}

export const recover_password = (email: string) => async (dispatch: any) => {
    const body = JSON.stringify({email});
    try {
        const res = await fetch(`/api/accounts/recover/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: body
        });

        //const data = await res.json();
        if (res.status === 200) {
            dispatch({
                type: PASSWORD_RECOVERY_SUCCESS
            })
        } else {
            dispatch({
                type: PASSWORD_RECOVERY_FAIL
            })
        }
    } catch (e: any) {
        dispatch({
            type: PASSWORD_RECOVERY_FAIL
        })
    }
}


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

export const register = ({username, email, password} : registerProps) => async (dispatch: any) => {
    const body = JSON.stringify({
        username, email, password
    });
    try {
        const response = await fetch(`/api/accounts/register/`, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        
        if (response.status == 201) {
            dispatch({
                type: REGISTER_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: REGISTER_FAIL
            })
        }
    } catch(error: any) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


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
        console.log(response.status)
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