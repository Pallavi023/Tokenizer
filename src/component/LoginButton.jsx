import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect(); // This should trigger the Auth0 login flow
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
};

export default LoginButton;
