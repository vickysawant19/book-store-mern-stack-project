import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthConext = createContext();

export const useAuth = () => {
  return useContext(AuthConext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  //registerUser
  const registerUser = async ({ email, password }) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //login a user
  const loginUser = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //sign in with google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };
  // logout user
  const logoutUser = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  //manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          username: displayName,
          photo: photoURL,
        };
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser,
    currentUser,
    authLoading,
  };

  return <AuthConext.Provider value={value}>{children}</AuthConext.Provider>;
};

export default AuthProvider;
