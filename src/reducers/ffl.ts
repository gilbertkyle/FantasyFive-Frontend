import {
    CREATE_LEAGUE_SUCCESS,
    CREATE_LEAGUE_FAIL, 
    CREATE_LEAGUE_PENDING, 
    JOIN_LEAGUE_PENDING, 
    LEAGUE_LOAD_SUCCESS, 
    LEAGUE_LOAD_FAIL, 
    FETCHING_LEAGUE, 
    FETCH_LEAGUE_SUCCESS,
    MAKING_PICK,
    PICK_FAIL,
    PICK_SUCCESS,
    WEEK_FAIL,
    WEEK_SUCCESS
    } from "../actions/types";



const initialState = {
    leagues: [],
    creatingLeague: false,
    joiningLeague: false,
    leagueCreated: true,
    selectedLeague: null,
    week: 0
}

const fflReducer = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type) {
        case CREATE_LEAGUE_SUCCESS:
            return {
                ...state,
                leagues: [...state.leagues, payload],
                leagueCreated: true,
                creatingLeague: false
            }
        case CREATE_LEAGUE_FAIL: 
            return {
                ...state,
                creatingLeague: false
            }
        case CREATE_LEAGUE_PENDING:
            return {
                ...state,
                creatingLeague: true
            }
        case LEAGUE_LOAD_SUCCESS:
            return {
                ...state,
                leagues: payload.data
            }
        case FETCH_LEAGUE_SUCCESS:
            return {
                ...state,
                selectedLeague: payload
            }
        case PICK_SUCCESS:     
            return {
                ...state,
            }
        case WEEK_SUCCESS:
            console.log(payload)
            return {
                ...state,
                week: payload
            }
        case WEEK_FAIL:
            return {
                ...state,
                week: 0
            }
        default: 
            return {
                ...state,
            }
        
    }
}

export default fflReducer;