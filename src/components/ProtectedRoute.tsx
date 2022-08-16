import { useEffect, useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateWrapperProps {
  children: JSX.Element;
}

export const PrivateWrapper = ({ children }: PrivateWrapperProps) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(true);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return isAuth ? children : <Navigate to="/" />;
};
