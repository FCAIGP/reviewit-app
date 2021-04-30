import {SET_AUTHED_USER} from "../actions/authedUser";
import {CLEAR_AUTHED_USER} from "../actions/authedUser";

const defState = {userInfo: null, token: null, isAdmin: null};

export default function authedUser(state = defState, action) {
    switch (action.type) {
        case CLEAR_AUTHED_USER:
            return defState
        case SET_AUTHED_USER:
            return {...action.data};
        default:
            return state;
    }
}