import React, { createContext, useState } from 'react';

export const AuthContext = createContext([]);

export const AuthContextProvider = ({ children })=>{

    const [loginAuth, setloginAuth] = useState(false);

    return(
        <AuthContext.Provider
        value={[
          { loginAuth },
          {
            setloginAuth
          },
        ]}
      >
        {children}
      </AuthContext.Provider>
    )

}