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

      // Only set logged in state and get user data if the response is successful
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        // For any other non-401 failure from the server, you could still toast.
        // But the main goal is to not toast on the initial 401.
        setIsLoggedin(false);
      }
    } catch (err) {
      // Check if the error is a 401 status
      if (err.response && err.response.status === 401) {
        // This is the expected behavior for an unauthenticated user.
        // Do nothing, do not show a toast message.
        setIsLoggedin(false);
      } else {
        // This is for unexpected errors (e.g., server down, 500 status)
        // In this case, you can show a toast message.
        toast.error(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
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
