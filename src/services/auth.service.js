import { client } from "../api/client";
import API from "../api/endpoints";

export const login = data => client.post(API.AUTH.LOGIN, data);

export const register = data => client.post(API.AUTH.REGISTER, data);