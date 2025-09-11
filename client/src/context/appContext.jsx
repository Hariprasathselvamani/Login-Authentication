import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContent = createContext();

const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-authenticated`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Auth check failed");
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      if (data.success) setUserData(data.userData);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};

export { AppContextProvider, AppContent };
