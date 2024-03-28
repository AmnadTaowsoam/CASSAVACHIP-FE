import React, { createContext, useContext, useState } from 'react';
import users from '../../assets/authConfig';
console.log('Loaded users:', users);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        console.log('Attempting login for:', username);
        const userCredentials = users[username];
        console.log('User Credentials:', userCredentials);
        if (userCredentials && userCredentials.password === password) {
            setUser({ username: userCredentials.username, role: userCredentials.role });
            return true;
        } else {
            alert('Incorrect username or password!');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
