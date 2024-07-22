import React, { createContext, useReducer, useEffect } from 'react';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('details')) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        currentUser: action.payload,
      };
    case 'LOGOUT':
      return {
        currentUser: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('details', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
