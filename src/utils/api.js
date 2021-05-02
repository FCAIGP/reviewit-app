const api = "/api";
const auth = "/auth";

const InitGet = (token = null) => ({
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    }
});

const InitPost = (body, token = null) => ({
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    },
    body: JSON.stringify(body)
});

const InitPut = (token) => ({
    method: 'put',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    }
});

const InitDelete = (token) => ({
    method: 'delete',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    }
});


function fetchRequest(input, init = null) {
    return fetch(input, init)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('API did not return an OK result.');
        });
}

const tokenResponseToState = ({userId, token}) => Promise.all([getUser(userId), isAdmin(token), token])
    .then(([userInfo, isAdmin, token]) => ({userInfo, isAdmin, token}));

//--------------------------------------------------------------------------------------------------

export const login = (username, password) =>
    fetchRequest(`${auth}/login`, InitPost({username, password}))
        .then(tokenResponseToState);

export const renewToken = () => fetchRequest(`${auth}/refresh-token`, InitGet())
    .then(tokenResponseToState);

export const getUser = (id) => fetchRequest(`${api}/user/${id}`, InitGet())
    .then(ret => ({...ret, userId: id}));

export const isUser = (token) => fetch(`${auth}/isuser`, InitGet(token))
    .then(res => res.ok)

export const isAdmin = (token) => fetch(`${auth}/isadmin`, InitGet(token))
    .then(res => res.ok);

export const getCompany = (id) => fetchRequest(`${api}/company/${id}`, InitGet());

export const getAllCompanies = () =>
    fetchRequest(`${api}/company`, InitGet());

export const getPosts = (id) => fetchRequest(`${api}/company/${id}/posts`, InitGet());
export const addPost = (text, images, id, token) => fetchRequest(`${api}/Post`, InitPost({ text, images, id }, token))
export const deletePost = (id, token) => fetch(`${api}/Post/${id}`, InitDelete(token))
export const updatePost = (id, text, images, companyId, token) => fetchRequest(`${api}/Post/${id}`, InitPut({ text, images, companyId }, token))

export const getAllClaimRequests = (token) => fetchRequest(`${api}/claimrequest`, InitGet(token));

export const acceptClaimRequest = (id, token) => fetchRequest(`${api}/ClaimRequest/${id}/accept`, InitPut(token));
export const rejectClaimRequest = (id, token) => fetchRequest(`${api}/ClaimRequest/${id}/reject`, InitPut(token));