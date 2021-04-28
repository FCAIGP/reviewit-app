import {login} from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(userInfo, token) {
    return {
        type: SET_AUTHED_USER,
        userInfo,
        token
    }
}

export function clearAuthedUser() {
    return {
        type: SET_AUTHED_USER,
        userInfo: null,
        token: null
    }
}

export function handleLogin(name, pass, keep, onSucceed = null, onFail = null) {
    return (dispatch) => {
        login(name, pass).then(({userInfo, token}) => {
            dispatch(setAuthedUser(userInfo, token));
            if (onSucceed)
                return onSucceed();
        }).catch((e) => onFail && onFail(e));
    };
}