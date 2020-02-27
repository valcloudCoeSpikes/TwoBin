import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import authConfig from './authConfig';

export const authContext = new AuthenticationContext(authConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, authConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, authConfig.endpoints.api);

export const getCachedToken = () => {
    return authContext.getCachedToken(authConfig.clientId);
  };
  
  // const user = getCachedUser();
  // console.log('Display Name: ' + user.profile.name);
  // console.log('User Email: ' + user.userName);
  export const getCachedUser = () => {
    return authContext.getCachedUser();
  };
  
  export const acquireToken = (callback) => {
    authContext.acquireToken(authConfig.endpoints.api, callback);
  };
  export const LogOut = () => {
    authContext.logOut();
};

export const acquireGraphToken = (callback) => {
  authContext.acquireToken(authConfig.endpoints.graph, callback);
};

  