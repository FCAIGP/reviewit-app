import {SET_AUTHED_USER} from "../actions/authedUser";

export default function authedUser(state = {userInfo: null, token: null}, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return {...state, userInfo: action.userInfo, token: action.token};
        default:
            return state;
    }
}