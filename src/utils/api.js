const api = "https://localhost:44300/api";
const auth = "https://localhost:44300/authenticate";

const GetRequest = (token = null) => ({
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    }
});

const PostRequest = (body, token = null) => ({
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    },
    body: JSON.stringify(body)
});


const fetchRequest = (input, init = null) => fetch(input, init)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('API did not return an OK result.');
    });

export const getUser = (id) => fetchRequest(`${api}/user/${id}`, GetRequest())
    .then(ret => ({...ret, userId: id}));

export const getCompany = (id) => fetchRequest(`${api}/company/${id}`, GetRequest());

export const getAllCompanies = () =>
    fetchRequest(`${api}/company`, GetRequest());

export const login = (username, password) =>
    fetchRequest(`${auth}/login`, PostRequest({username, password}))
        .then(({userId, token}) => Promise.all([getUser(userId), token]))
        .then(([userInfo, token]) => ({userInfo, token}));

