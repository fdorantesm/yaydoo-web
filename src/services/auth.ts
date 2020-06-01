import axios, { AxiosPromise } from 'axios';
import LoginResponse from '../../interfaces/LoginResponse';
import FacebookResponse from '../components/partials/FacebookLoginButton/FacebookResponse';
import { IUser } from '../store/user/types';

export function login(credentials: FacebookResponse): AxiosPromise<LoginResponse> {
  return axios.post<LoginResponse>(process.env.AUTH_API_URL + '/auth/facebook', credentials);
}

export function me(): AxiosPromise {
  return axios.get<IUser>(process.env.AUTH_API_URL + '/auth/me');
}
