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
      <div className="bg-gradient-to-r from-purple-200 via-pink-100 to-red-200 min-h-screen p-4">
       <div className="flex flex-row absolute top-0 right-0 m-4">
  <button onClick={toggleDetails} className="flex items-center">
    <AccountCircleIcon style={{ fontSize: 30 }} />
  </button>
  {showDetails && (
    <div className="mt-4 p-4 border rounded bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <img src={user.picture} alt="User Avatar" className="rounded-full h-24 w-24 mx-auto mb-2" />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )}
  <button onClick={handleLogout} className="mt-1 px-4 py-2 rounded-md text-white bg-black-500 hover:bg-white-600">
    Logout
  </button>
</div>

        <div className="App flex justify-center items-center">
          <div className="container max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Mistral Tokenizer</h1>
            <p className="text-gray-600 mb-6">
              Large language models such as Mistral decode text through tokens — frequent
              character sequences within a text corpus.
            </p>
            <p className="text-gray-600 mb-6">
              These models master the art of recognizing patterns among tokens, adeptly
              predicting the subsequent token in a series.
            </p>
            <p className="text-gray-600 mb-6">
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
                {text.split(/\s+/).map((token, index) => (
                  <span key={index} className="inline-block m-1 border border-white">
                    <span
                      style={{
                        backgroundColor:
                          index % 5 === 0
                            ? '#ff6f61' // vibrant red
                            : index % 5 === 1
                            ? '#6b5b95' // vibrant purple
                            : index % 5 === 2
                            ? '#88b04b' // vibrant green
                            : index % 5 === 3
                            ? '#f7cac9' // vibrant pink
                            : '#92a8d1', // vibrant blue
                        color: 'black',
                        borderRadius: '5px',
                        padding: '2px 5px',
                      }}
                    >
                      {token}
                    </span>
                    {' '}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default UserProfile;
