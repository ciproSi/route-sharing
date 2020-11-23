import React, { createContext, useState } from "react";


export const UserContext = createContext();

const UserProvider = ({ children }) => {



return (
    <UserContext.Provider value={{ articles, saveArticle }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;