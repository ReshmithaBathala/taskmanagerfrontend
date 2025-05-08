// // 📁 src/context/AuthContext.js
// import { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = token;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`) // optional if you want to fetch user
//         .then(res => setUser(res.data))
//         .catch(() => setUser(null));
//     }
//   }, []);

//   const login = (userData, token) => {
//     Cookies.set('token', token);
//     axios.defaults.headers.common['Authorization'] = token;
//     setUser(userData);
//   };

//   const logout = () => {
//     Cookies.remove('token');
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUser({}); // You can fetch user data here if needed
    }
  }, []);

  const login = (token, userData = {}) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
