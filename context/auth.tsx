import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react';

import {
  getAuthUserName,
  getAuthUserEmail,
  getAuthUserId,
} from 'components/Auth/Utils';

const AuthStateContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    setUsername(getAuthUserName());
    setEmail(getAuthUserEmail());
    setId(getAuthUserId());
  }, []);

  return (
    <AuthStateContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        email: email,
        setEmail: setEmail,
        id: id,
        setId: setId,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

const useAuth = () => useContext<any>(AuthStateContext);

export { AuthStateContext, AuthProvider, useAuth };
