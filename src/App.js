import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./component/Navbar";
import UserDetail from "./component/UserDetail";
import DataPage from "./component/DataPage";
import LoginButton from "./component/LoginButton";
import SignupButton from "./component/SignupButton";
import NET from 'vanta/src/vanta.net';
import halo from 'vanta/src/vanta.halo';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      NET({
        el: '#vanta'
      });
      halo({
        el: '#vanta1'
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <>
                  <div
                    className="flex justify-center items-center h-screen"
                    id="vanta1"
                  >
                    <div className="text-center space-y-4 p-4 rounded-lg">
                      <div className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
                        <LoginButton />
                      </div>
                      <div className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
                        <SignupButton />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Navbar />
                  <div className="flex flex-col md:flex-row h-screen" id="vanta">
                    <UserDetail />
                    <DataPage />
                  </div>
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
