import React,{ createContext } from "react";
import UserAuth from "../hooks/UserAuth";

export const AuthContext = createContext();
export const AuthContextProvider = ({children})=>(
  <AuthContext.Provider value={UserAuth()}>
    {children}
  </AuthContext.Provider>
)