import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

// Contexto criado
export const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
     const [user, setUser] = useState(null);

     useEffect(() => {
          // Observa as mudanças no estado de autenticação
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
               setUser(user);
          });

          // Limpa o observador ao desmontar
          return () => unsubscribe();
     }, []);

     return (
          <UserContext.Provider value={{ user, setUser }}>
               {children}
          </UserContext.Provider>
     )
}