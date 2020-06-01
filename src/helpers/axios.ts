import axios from 'axios';

export function setDefaultAuthHeaders(accessToken): void {
  axios.defaults.headers.common.Authorization = accessToken;
}
