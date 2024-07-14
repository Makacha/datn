import services from "./request";
import {requestHelpers} from "../helpers";
import {IIndicator} from "../interfaces";

const getIndicators = async (keyword: string, page?: number, pageSize?: number) => {
  return services.get(`/chart/indicator`, {
    params: {
      keyword,
      page: page ?? 1,
      page_size: pageSize ?? 20,
    }
  }).then(requestHelpers.getResult<IIndicator[]>);
}

const chartServices = {
  getIndicators,
}

export default chartServices;