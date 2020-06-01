export default interface IFacebookAuthResponse {
  authResponse: {
    accessToken: string
    userID: string
    expiresAt: number
    signedRequest: string
    graphDomain: string
    grantedScopes
    data_access_expiration_time: number
  };
  status?: string;
}
