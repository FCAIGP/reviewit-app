const api = "https://localhost:44300/api";

const headers = {
    'Accept': 'application/json'
};

export const getAllCompanies = () =>
    fetch(`${api}/company`, {headers})
        .then(res => res.json());
