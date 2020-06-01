export default interface FacebookResponse {
  authResponse: {
    accessToken: string
    userID: string
    expiresIn: number
    signedRequest: string
    graphDomain: string
    grantedScopes: string
    data_access_expiration_time: number
  };
  status: string;
}
