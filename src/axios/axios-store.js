import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-46f7b.firebaseio.com/',

})
instance.defaults.headers.common['Authorization'] = 'AIzaSyBSsaAL-yzBW-X7h1iTicGWEjQPyFyWcQg';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;