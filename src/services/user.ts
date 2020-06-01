import axios, { AxiosPromise } from 'axios';
import querystring from 'querystring';
import FacebookResponse from '../components/partials/FacebookLoginButton/FacebookResponse';
import IFacebookPost from '../interfaces/IFacebookPost';

export function getPosts(credentials: FacebookResponse): AxiosPromise<IFacebookPost[]> {
  return axios.get<IFacebookPost[]>(process.env.AUTH_API_URL + '/user/posts?' + querystring.stringify({ accessToken: credentials.authResponse.accessToken, userID: credentials.authResponse.userID }));
}
