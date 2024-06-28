import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './component/Navbar';
import UserDetail from './component/UserDetail'; // Ensure file name casing matches
import DataPage from './component/DataPage';
import Hero from './component/Hero';
import LoginButton from './component/LoginButton';
import SignupButton from './component/SignupButton';
function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state if needed
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the Hero component, only accessible when not authenticated */}
          <Route path="/" element={!isAuthenticated ? <>
            <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url("/img/bg.jpg")`, // Adjust the path as per your project structure
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center space-y-4 p-4 rounded-lg">
        <div className="border border-gray-300 rounded-lg px-4 py-2">
          <LoginButton />
        </div>
        <div className="border border-gray-300 rounded-lg px-4 py-2">
          <SignupButton />
        </div>
      </div>
    </div>
          </> : <Navigate to="/dashboard" />} />

          {/* Private route for the dashboard, accessible only when authenticated */}
          <Route path="/dashboard/*" element={isAuthenticated ? (
            <>
              <Navbar />
              <div className="flex flex-col md:flex-row min-h-screen">
                <UserDetail />
                <DataPage />
              </div>
            </>
          ) : (
            <Navigate to="/" />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
