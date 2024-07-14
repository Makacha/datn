import axios from 'axios';
import {userHelpers, requestHelpers} from "../helpers";


const services = axios.create({
  baseURL: window.BACKEND_URL
});

const getAuthorization = () => {
  return userHelpers.isLoggedIn()
    ? `Bearer ${userHelpers.getAccessToken()}`
    : '';
};

const requestInterceptor = (request: any) => {
  request.headers.Authorization = getAuthorization();
  return request
}

services.interceptors.request.use(requestInterceptor);
services.interceptors.response.use(requestHelpers.handleSuccess, requestHelpers.handleError);

export default services;
