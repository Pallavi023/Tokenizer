import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserProfile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  // Ensure these hooks are always called, not conditionally
  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (isLoading) {
    return <div>Loading!</div>;
  }

  const countTokens = (input) => {
    return input.split(/\s+/).filter(Boolean).length;
  };

  const countCharacters = (input) => {
    return input.length;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    isAuthenticated && (
      <>
        <div className="flex flex-col items-end p-2">
          <button onClick={toggleDetails} className="flex items-center mt-4">
          <AccountCircleIcon style={{ fontSize: 30 }} />
          
        </button>
        {showDetails && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <img src={user.picture} alt="User Avatar" className="rounded-full h-24 w-24 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}
        <button onClick={handleLogout} className="mt-2 px-1 py-1 bg-gray-300 rounded-md text-gray-700">
          Logout
        </button>
        </div>
        <div className="App flex justify-center items-center">
          <div className="container max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Mistral Tokenizer</h1>
            <p className="text-gray-600 mb-6 text-">
              Large language models such as Mistral decode text through tokens — frequent
              character sequences within a text corpus.
            </p>
            <p className="text-gray-600 mb-6 ">
              These models master the art of recognizing patterns among tokens, adeptly
              predicting the subsequent token in a series.
            </p>
            <p className="text-gray-600 mb-6 ">
              Below, you'll find a tool designed to show how Mistral models break down a text into tokens,
              alongside a tally of the total tokens present in the text.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-[250px] w-[600px] p-4 border-black border-2"
              placeholder="Type here..."
            />

            <div className="flex flex-col">
              <div className="flex gap-10 w-10">
                <p className="w-10">Token:</p>
                <p>Characters:</p>
              </div>
              <div className="flex gap-10 text-blue-500 font-bold text-2xl">
                <p className="w-10">{countTokens(text)}</p>
                <p>{countCharacters(text)}</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className="flex items-center">
                <Switch
                  checked={showText}
                  onChange={() => setShowText(!showText)}
                  className="mr-2"
                /> Show text
              </label>
            </div>

            {showText && (
              <div className="p-4 border rounded bg-red-100 flex justify-center mt-4 border-white">
                {/* Displaying the input text in the show text section */}
                {text.split(/\s+/).map((token, index) => (
                  <span key={index} className="inline-block m-1 border border-white">
                    <span
                      style={{
                        backgroundColor:
                          index % 5 === 0
                            ? '#F7DC6F' // light yellow
                            : index % 5 === 1
                            ? '#ADD8E6' // light blue
                            : index % 5 === 2
                            ? '#C6E2B5' // light green
                            : index % 5 === 3
                            ? '#F0F0F0' // light gray
                            : '#FFD7BE', // light orange
                        color: 'black',
                        borderRadius: '5px',
                        padding: '2px 5px',
                      }}
                    >
                      {token}
                    </span>
                    {/* Adding a space after each token for readability */}
                    {' '}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      </>
    )
  );
}

export default UserProfile;
