import {CREATE_LEAGUE_FAIL, 
    CREATE_LEAGUE_SUCCESS, 
    JOIN_LEAGUE_SUCCESS, 
    JOIN_LEAGUE_FAIL, 
    CREATE_LEAGUE_PENDING, 
    JOIN_LEAGUE_PENDING, 
    LEAGUES_LOADING, 
    LEAGUE_LOAD_FAIL, 
    LEAGUE_LOAD_SUCCESS,
    FETCHING_LEAGUE,
    FETCH_LEAGUE_SUCCESS,
    MAKING_PICK,
    PICK_FAIL,
    PICK_SUCCESS,
    WEEK_FAIL,
    WEEK_SUCCESS
} from "../actions/types";

import {message} from "antd";

export const fetchWeek = () => async (dispatch: any) => {
    try {
        const response = await fetch(`/api/ffl/week`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (response.status === 200) {
            dispatch({
                type: WEEK_SUCCESS,
                payload: data.week
            })
        } else {
            dispatch({
                type: WEEK_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: WEEK_FAIL
        })
    }
}


export const updatePick = (pick: any) => async (dispatch: any) => {

    dispatch({
        type: MAKING_PICK
    })

    const {id, qb, rb, wr, te, defense} = pick;
    const body = JSON.stringify({id, qb, rb, wr, te, defense});

    try {
        const response = await fetch(`/api/ffl/pick/${id}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: body
        })
        const data = await response.json()
        if (response.status === 200) {
            message.success(`Pick successfully made.`)
            dispatch({
                type: PICK_SUCCESS,
                payload: data.pick
            })
        } else {
            dispatch({
                type: PICK_FAIL
            })
        }  
    } catch (error) {
        message.error(`${error}`)
        dispatch({
            type: PICK_FAIL,
            error: error
        })
    }
}

export const joinLeague = (name: string, password:string) => async (dispatch: any) => {
    dispatch({
        type: JOIN_LEAGUE_PENDING
    })

    const body = JSON.stringify({
        name, password
    })

    try {
        const response = await fetch('api/ffl/league/join', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        const data = await response.json()

        if (response.status === 200) {
            dispatch({
                type: JOIN_LEAGUE_SUCCESS,
                payload: data
            })
        } else {
            console.log(response.status)
            dispatch({
                type: JOIN_LEAGUE_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: JOIN_LEAGUE_FAIL
        })
    }
}

export const createLeague = (name: string, password: string) => async (dispatch: any) => {
    dispatch({
        type: CREATE_LEAGUE_PENDING
    })

    const body = JSON.stringify({
        name, password
    })
    try {
        const response = await fetch('/api/ffl/league/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        const data = await response.json()
        if (response.status === 200) {
            dispatch({
                type: CREATE_LEAGUE_SUCCESS,
                payload: data
            })
        } else {  
            dispatch({
                type: CREATE_LEAGUE_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: CREATE_LEAGUE_FAIL,
            error: error
        })
    }
}

export const getLeagues = () => async (dispatch: any) => {
    dispatch({
        type: LEAGUES_LOADING
    })

    try {
        const response = await fetch(`api/ffl/league`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        dispatch({
            type: LEAGUE_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LEAGUE_LOAD_FAIL
        })
    }
}

export const getLeagueDetail = (id: any) => async (dispatch: any) => {
    // dispatch something here
    dispatch({
        type: FETCHING_LEAGUE
    })
    try {
        const response = await fetch(`/api/ffl/league/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json()
        dispatch({
            type: FETCH_LEAGUE_SUCCESS,
            payload: data.league
        })
    } catch (error) {
        //dispatch error here
        console.log(error);
    }
}