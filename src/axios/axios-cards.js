import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.scryfall.com/',

})
// instance.defaults.headers.common['Authorization'] = 'AIzaSyBSsaAL-yzBW-X7h1iTicGWEjQPyFyWcQg';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;