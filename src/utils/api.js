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

const InitPut = (body = null, token = null) => ({
    method: 'put',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    },
    body: body ? JSON.stringify(body) : null
});

const InitDelete = (token) => ({
    method: 'delete',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : null
    }
});


function fetchRequest(input, init = null) {
    return fetch(input, init)
        .then(res => {
            if (res.ok) return res.json();
            try {
                res.json().then(v => console.log(v));
            } catch (_) {
                console.log("No response body.")
            }
            throw new Error('API did not return an OK result.');
        });
}

const tokenResponseToState = ({userId, token}) => Promise.all([getUser(userId), isAdmin(token), token])
    .then(([userInfo, isAdmin, token]) => ({userInfo, isAdmin, token}));

//--------------------------------------------------------------------------------------------------

export const logout = () => fetch(`${auth}/logout`, InitGet());

export const login = (username, password) =>
    fetchRequest(`${auth}/login`, InitPost({username, password}))
        .then(tokenResponseToState);

export const register = (dto) => fetchRequest(`${auth}/register`, InitPost(dto));

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

export const getReviews = (id) => fetchRequest(`${api}/company/${id}/reviews`, InitGet());
export const getReview = (id) => fetchRequest(`${api}/review/${id}`, InitGet())
export const addReview = (contact, salary, jobDescription, body, tags, companyId, isAnonymous, token) => fetchRequest(`${api}/Review`, InitPost({
    contact, salary, jobDescription, body, tags, companyId, isAnonymous
}, token))
export const deleteReview = (id, token) => fetchRequest(`${api}/review/${id}`, InitDelete(token))

export const getVotes = (id) => fetchRequest(`${api}/Review/${id}/votes`, InitGet());
export const Upvote = (id, token) => fetchRequest(`${api}/Review/${id}/upvote`, InitPut(null, token));
export const DownVote = (id, token) => fetchRequest(`${api}/Review/${id}/downvote`, InitPut(null, token));

export const getReplies = (id) => fetchRequest(`${api}/Review/${id}/replies`, InitGet());
export const addReply = (parentId, body, token) => fetchRequest(`${api}/Reply`, InitPost({parentId, body},token))
export const getReply = (id) => fetchRequest(`${api}/Reply/${id}`, InitGet())

export const getPosts = (id) => fetchRequest(`${api}/company/${id}/posts`, InitGet());
export const getPost = (id) => fetchRequest(`${api}/Post/${id}`, InitGet());
export const addPost = (text, images, companyId, token) => fetchRequest(`${api}/Post`, InitPost({
    text,
    images,
    companyId
}, token))
export const deletePost = (id, token) => fetch(`${api}/Post/${id}`, InitDelete(token))
export const updatePost = (id, text, images, companyId, token) =>
    fetchRequest(`${api}/Post/${id}`, InitPut({text, images, companyId}, token))

export const addClaimRequest = (description, title, identificationCard, proofOfWork, linkedInAccount, companyID, token) =>
    fetchRequest(`${api}/ClaimRequest`, InitPost({description, title, identificationCard, proofOfWork, linkedInAccount, companyID}, token));

export const getAllClaimRequests = (token) => fetchRequest(`${api}/claimrequest`, InitGet(token));

export const acceptClaimRequest = (id, token) => fetchRequest(`${api}/ClaimRequest/${id}/accept`, InitPut(null, token));
export const rejectClaimRequest = (id, token) => fetchRequest(`${api}/ClaimRequest/${id}/reject`, InitPut(null, token));