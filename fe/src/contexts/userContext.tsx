import React, {createContext, useEffect, useState} from "react";
import {IUserInfo, IUserContext} from "../interfaces";
import {userServices} from "../services";
import {browserHistory} from "../helpers";
const UserStore = createContext<IUserContext | null>(null);
export default UserStore;
