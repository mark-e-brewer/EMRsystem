import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  const updateUser = useMemo(
    () => (uid) => checkUser(uid).then((gamerInfo) => {
      setUser({ fbUser: oAuthUser, ...gamerInfo });
    }),
    [oAuthUser],
  );

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);

        checkUser(fbUser.uid).then((gamerInfo) => {
          let userObj;

          if (!gamerInfo) {
            userObj = {
              uid: fbUser.uid,
              email: fbUser.email,
              name: fbUser.displayName,
              photoURL: fbUser.photoURL,
            };
          } else {
            userObj = {
              ...gamerInfo,
              uid: fbUser.uid,
              fbUser,
            };
          }

          setUser(userObj);
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      updateUser,
      userLoading: user === null || oAuthUser === null,
    }),
    [user, oAuthUser, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
