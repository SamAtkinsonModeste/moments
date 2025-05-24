import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        //NOTE -  if user is logged in, the code below 👇 will run
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        //NOTE - if user is not looged in, the code below 👇 will run
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
