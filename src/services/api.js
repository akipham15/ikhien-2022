import axios from 'axios'


// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: 'https://7799-118-70-7-113.ngrok.io/',

    timeout: 5000,
    timeoutErrorMessage: 'Timeout'
})

export default instance