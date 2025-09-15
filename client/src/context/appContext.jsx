import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const AppContent = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // States
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Axios global config
  axios.defaults.withCredentials = true;

  // Fetch user data
  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        setIsLoggedin(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Token expired or invalid
        setIsLoggedin(false);
        setUserData(null);
      } else {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  }, [backendUrl]);

  // Check authentication state
  const getAuthState = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-authenticated`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setIsLoggedin(false);
        setUserData(null);
      } else {
        toast.error(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [backendUrl, getUserData]);

  // On mount, check auth
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        getAuthState,
        loading,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};

export { AppContextProvider, AppContent };
