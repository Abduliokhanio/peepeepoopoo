/* eslint-disable no-undef */
import React, { useContext, useState, useEffect, createContext } from 'react';
import { supabasePublic } from '../services/supabasePublic';
import { supabasePrivate } from '../services/supabasePrivate';

// create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userPrivate, setUserPrivate] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabasePublic.auth.getSession();
    const sessionPrivate = supabasePrivate.auth.getSession();

    setUser(session?.user ?? null);
    setUserPrivate(sessionPrivate?.user ?? null);

    setLoading(false);

    supabasePublic.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabasePublic.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabasePrivate.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabasePrivate.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const script = document.createElement('script');
    script.setAttribute('src', 'https://sharingthecredit.transactiongateway.com/token/Collect.js');
    script.setAttribute('data-tokenization-key', process.env.REACT_APP_COLLECTJS_TOKEN);
    document.body.appendChild(script);
  }, []);

  // create signUp, signIn, signOut functions
  const value = {
    signUp: data => supabasePublic.auth.signUp(data),
    loginIn: (data) => supabasePublic.auth.signInWithPassword(data),
    signOut: () => supabasePublic.auth.signOut(),
    user
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};