import IFacebookPost from '../../interfaces/IFacebookPost';

export interface IUserData {
  fullname: string;
  gender: string;
  facebookId: string;
  dob: Date;
}

export interface IUser {
  username: string;
  email: string;
  lastConnection: Date;
  userData: IUserData;
}

export interface IUserState {
  posts: IFacebookPost[];
}
