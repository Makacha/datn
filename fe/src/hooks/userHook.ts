import {useEffect, useState} from "react";
import {IUserInfo} from "../interfaces";
import {userServices} from "../services";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<IUserInfo | null>(null);

  const getFullUserInfo = async () => {
    const fullUserInfo = await userServices.getUserInfo();
    setCurrentUser(fullUserInfo.data as IUserInfo);
  };

  useEffect(() => {
    getFullUserInfo().then((r) => r);
  }, []);

  return {currentUser};
}

const userHook = {
  useCurrentUser,
}

export default userHook;