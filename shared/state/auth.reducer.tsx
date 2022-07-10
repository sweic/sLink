import { InferQueryOutput } from "@backend/utils/router";
import React, { createContext, useContext } from "react";
import { useReducer } from "react";
interface UserAuthAction {
  type: UserAuthActionType;
  payload?: string;
}
enum UserAuthActionType {
  LOGIN,
  LOGOUT,
  LOAD,
}

interface UserAuthValue {
  user: string;
  loaded: boolean;
}
type UserAuthContextActions = {
  loadApp: () => void;
  loginUser: (user: string) => void;
  logoutUser: () => void;
};
interface UserAuthContext extends UserAuthValue, UserAuthContextActions {}
const initialState: UserAuthContext = {
  user: "",
  loaded: false,
  loadApp: () => {},
  loginUser: (user: string) => {},
  logoutUser: () => {},
};

function authReducer(
  state: UserAuthValue,
  action: UserAuthAction
): UserAuthValue {
  const { type, payload } = action;
  switch (type) {
    case UserAuthActionType.LOGIN:
      return {
        ...state,
        user: payload!,
      };
    case UserAuthActionType.LOGOUT:
      return {
        ...state,
        user: "",
      };
    case UserAuthActionType.LOAD:
      return {
        ...state,
        loaded: true,
      };
    default:
      return state;
  }
}
const AuthContext = createContext<UserAuthContext>(initialState);
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = {
    ...state,
    loadApp: () => dispatch({ type: UserAuthActionType.LOAD }),
    loginUser: (user: string) =>
      dispatch({ type: UserAuthActionType.LOGIN, payload: user }),
    logoutUser: () => dispatch({ type: UserAuthActionType.LOGOUT }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
