import {IDataResponse} from "../interfaces";
import {notification} from "antd";
import userHelpers from "./user";


const handleSuccess = (response: any) => {
  return response;
};

const handleError = (error: any) => {
  const status = error && error.response && error.response.status;
  let response = {
    status: '500',
    data: {
      code: '999',
      message: 'Đã có lỗi xảy ra!'
    }
  }
  switch (status) {
    case 403:
      userHelpers.logout();
      break;
    default:
      if (error.response && error.response.data) {
        response = error.response;
      }
      notification.error({
        message: 'Thất bại',
        description: response.data.message
      });
  }
  return response;
};

function getResult<T>(res: any) {
  return res.data as IDataResponse<T>;
}

const requestHelpers = {
  getResult,
  handleSuccess,
  handleError,
};

export default requestHelpers;