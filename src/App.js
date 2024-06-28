import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginButton from "./component/loginButton";
import UserProfile from "./component/userProfile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state if needed
  }

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <div
            className="flex justify-center items-center h-screen"
            style={{
              backgroundImage: `url("/img/bg.jpg")`, // Adjust the path as per your project structure
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center space-y-4 p-4 rounded-lg">
              <div className="border border-gray-300 rounded-lg px-4 py-2">
                <LoginButton />
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/*" element={<Navigate to="/profile" />} />
          </Routes>
        )}
       
      </div>
    </Router>
  );
}

export default App;
