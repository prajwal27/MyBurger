import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://objectdetection-801ce.firebaseio.com/'
});

export default instance;