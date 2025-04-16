import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ClearStorageOnNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const keysToRemoveOnHome = ["adminData"];
    const keysToRemoveOnAdmin = [
      "userData",
      "token",
      "isLoggedIn",
      "loggedInUserName",
    ];

    const clearSpecificStorage = (keysToRemove) => {
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    };

    if (location.pathname === "/") {
      clearSpecificStorage(keysToRemoveOnHome);
    } else if (location.pathname === "/admin") {
      clearSpecificStorage(keysToRemoveOnAdmin);
    }
  }, [location.pathname, navigate]);

  return null;
};

export default ClearStorageOnNavigate;
