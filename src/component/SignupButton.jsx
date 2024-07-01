import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    loginWithRedirect({ screen_hint: "signup" }); // This should trigger the Auth0 signup flow
  };

  return (
    <button onClick={handleSignup} className="text-black ">
      Signup
    </button>
  );
};

export default SignupButton;
