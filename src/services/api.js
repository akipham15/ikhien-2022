import axios from 'axios'


// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: 'https://hnld.bot.csoc.fpt.net/',

    timeout: 5000,
    timeoutErrorMessage: 'Timeout'
})

export default instance