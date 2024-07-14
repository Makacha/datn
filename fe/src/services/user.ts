import services from "./request";
import {requestHelpers} from "../helpers";
import {ILoginResponse, IUserInfo} from "../interfaces";

const signUp = async (params: any) => {
  return services.post('/user/signup', params).then(requestHelpers.getResult<IUserInfo>);
}

const login = async (params: any) => {
  return services.post('/user/login', params).then(requestHelpers.getResult<ILoginResponse>);
}

const getUserInfo = async () => {
  return services.get('/user/info').then(requestHelpers.getResult<IUserInfo>);
}

const searchUser = async (params: any) => {
  return services.get('/user', {params}).then(requestHelpers.getResult<IUserInfo>);
}

const userServices = {
  signUp,
  login,
  getUserInfo,
  searchUser
}

export default userServices;
