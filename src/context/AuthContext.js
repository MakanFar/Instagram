import React, { createContext, useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from 'prop-types';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = await getDoc(doc(firestore, `user/${user?.uid}`));
          setUser({
            ...user,
            displayName: userRef.data()?.fullName || null,
            photoURL: userRef.data()?.photoURL || null,
            username: userRef.data().username || null,
            isVerified: userRef.data().isVerified || false,
          });
          setLoading(false);
        }
        if (!user) {
          setUser(null);
          setLoading(false);
        }
      });
    };
     getUser();
  }, []);


  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await setDoc(
        doc(firestore, "user", `${user?.uid}`),
        {
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const signUp = async (email, password, username, fullname) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        (user) => {
          console.log(user);
        }
      );
      await setDoc(
        doc(firestore, "user/8w1EoYdTO20EASNNacla"),
        {
          followedBy: arrayUnion(user.uid),
        },
        {
          merge: true,
        }
      );
      await setDoc(doc(firestore, "user", `${user?.uid}`), {
        userId: user?.uid,
        biography: "Hey there! I am new in this Instagram clone.",
        categoryName: "Normal User",
        following: ["8w1EoYdTO20EASNNacla"],
        fullName: fullname,
        photoURL:
          "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
        email: user?.email,
        isVerified: false,
        username: username,
        lastLogin: serverTimestamp(),
      });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const logout = async () => {
    console.log("Logout");
    signOut(auth);
    setUser(null);
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {loading || children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  };


export { AuthContext, AuthProvider };
