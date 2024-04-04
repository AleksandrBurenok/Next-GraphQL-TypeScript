const setAuthToken = (token: string) => {
  return localStorage.setItem('Auth-Token', token);
};

const getAuthToken = () => {
  return localStorage.getItem('Auth-Token') as string;
};

const getAuthHeader = () => {
  return 'Bearer ' + getAuthToken();
};

const resetAuthToken = () => {
  return localStorage.removeItem('Auth-Token');
};

const setAuthUserName = (username: string) => {
  return localStorage.setItem('Auth-Token-User-Name', username);
};

const setAuthUserEmail = (email: string) => {
  return localStorage.setItem('Auth-Token-User-Email', email);
};

const setAuthUserId = (id: string) => {
  return localStorage.setItem('Auth-Token-User-Id', id);
};

const getAuthUserName = () => {
  return localStorage.getItem('Auth-Token-User-Name') as string;
};

const getAuthUserEmail = () => {
  return localStorage.getItem('Auth-Token-User-Email') as string;
};

const getAuthUserId = () => {
  return localStorage.getItem('Auth-Token-User-Id') as string;
};

const hasAuthToken = () => {
  let token = getAuthToken();
  return token && token.length > 0;
};

const logout = (
  setUsername: (data: string) => void,
  setEmail: (data: string) => void,
  setId: (data: string) => void
) => {
  localStorage.removeItem('Auth-Token-User-Name');
  localStorage.removeItem('Auth-Token-User-Email');
  localStorage.removeItem('Auth-Token-User-Id');
  resetAuthToken();
  setUsername('');
  setEmail('');
  setId('');
};

export {
  setAuthToken,
  getAuthToken,
  resetAuthToken,
  hasAuthToken,
  logout,
  setAuthUserName,
  getAuthUserName,
  getAuthHeader,
  setAuthUserEmail,
  getAuthUserEmail,
  getAuthUserId,
  setAuthUserId,
};
