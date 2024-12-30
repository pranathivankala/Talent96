import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  userData: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
