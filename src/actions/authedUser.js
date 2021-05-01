import {login, renewToken} from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const CLEAR_AUTHED_USER = 'CLEAR_AUTHED_USER';

export function setAuthedUser(data) {
    return {
        type: SET_AUTHED_USER,
        data
    }
}

export function clearAuthedUser() {
    return {
        type: CLEAR_AUTHED_USER
    }
}

export function handleRenewToken() {
    return (dispatch) => {
        renewToken().then(res => dispatch(setAuthedUser(res)), e => dispatch(clearAuthedUser()));
    }
}

export function handleLogin(name, pass, keep, onSucceed = null, onFail = null) {
    return (dispatch) => {
        login(name, pass).then(res => {
            dispatch(setAuthedUser(res));
            if (onSucceed)
                return onSucceed();
        }).catch((e) => onFail && onFail(e));
    };
}