import { IUser } from '../user/types';

export interface IAuthState {
  user?: IUser;
  accessToken?: string | undefined;
}
