import React, { createContext, useContext, useState } from 'react';

// Define el tipo del contexto
interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// El contexto ahora tiene user y setUser
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};
