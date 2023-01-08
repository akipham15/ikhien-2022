import axios from 'axios'


// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: 'http://localhost:3000/',

    timeout: 5000,
    timeoutErrorMessage: 'Timeout'
})

export default instance