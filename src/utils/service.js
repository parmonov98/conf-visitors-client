import {setAlert} from '../actions/alert';

const localStorageKey = 'token';

function isValidJsonString(tester) {
    //early existing
    if (/^\s*$|undefined/.test(tester) || !(/number|object|array|string|boolean/.test(typeof tester))) {
        return false;
    }
    ;
//go ahead do you parsing via try catch
    return true;

};

function request(endpoint, {body, ...customConfig} = {}, dispatch) {
    const token = window.localStorage.getItem(localStorageKey)
    const headers = {'content-type': 'application/json', 'accept': 'application/json'}

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }
    if (body) {
        config.body = JSON.stringify(body)
    }


    // return JSON.parse("{}");

    let url = `${process.env.REACT_APP_API_URL}${endpoint}`;
    if (process.env.REACT_APP_MODE === 'stage') {
        url = `${process.env.REACT_APP_STAGING_APP_API_URL}${endpoint}`;
    }
    if (process.env.REACT_APP_MODE === 'prod') {
        url = `${process.env.REACT_APP_PRODUCTION_APP_API_URL}${endpoint}`;
    }
    return fetch(url, config)
        .then(async response => {

            if (response.status === 401) {
                logout();
                window.location.assign(window.location)
                return
            }
            if (response.status === 404) {
                const data = await response.json();

                if (data.hasOwnProperty('message')) {
                    dispatch(setAlert(data.message, 'danger'));
                } else {
                    dispatch(setAlert("So'ralgan ma'lumot topilmadi!", 'danger'));
                }
                return;
            }
            if (response.ok) {
                // const cloneResponse = response.clone();

                const data = await response.text();

                if (isValidJsonString(data)) {
                    return JSON.parse(data);
                } else {
                    return data
                }
            } else {
                const errorMessage = await response.text()
                return Promise.reject(new Error(errorMessage))
            }
        })
}

function logout() {
    window.localStorage.removeItem(localStorageKey)
}

export {request, logout}
