import React, { useState, useEffect, useRef } from 'react';
import Switch from '@mui/material/Switch';
import { useAuth0 } from '@auth0/auth0-react';
const UserDetail = () =>{
  const { isAuthenticated, isLoading } = useAuth0();
  const topRef = useRef(null); // Reference for scrolling to top

  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);
  const [history, setHistory] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('tokenizerHistory')) || [];
    setHistory(savedHistory);
  }, []);

  if (isLoading) {
    return <div>Loading!</div>;
  }

  const countTokens = (input) => {
    return input.split(/\s+/).filter(Boolean).length;
  };

  const countCharacters = (input) => {
    return input.length;
  };


  const saveResults = () => {
    const newEntry = {
      text,
      tokens: countTokens(text),
      characters: countCharacters(text),
      timestamp: new Date().toLocaleString(),
    };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('tokenizerHistory', JSON.stringify(updatedHistory));
    setShowSuccessNotification(true); // Show success notification
    scrollToTop(); // Scroll to top of the page
    setTimeout(() => {
      setShowSuccessNotification(false); // Hide notification after 3 seconds
    }, 3000); // Adjust duration as needed
  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    isAuthenticated && (
      <div className="flex-1 p-4">
        {showSuccessNotification && (
          <div className="text-green-600 text-center py-2">
            Results saved successfully!
          </div>
        )}

        <div ref={topRef} className="App flex justify-center items-center">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Mistral Tokenizer</h1>
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
              className="w-full h-48 p-4 border-black border-2"
              placeholder="Type here..."
            />

            <div className="flex flex-col">
              <div className="flex gap-10">
                <p className="w-20">Token:</p>
                <p>Characters:</p>
              </div>
              <div className="flex gap-10 text-blue-500 font-bold text-2xl">
                <p className="w-20">{countTokens(text)}</p>
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
  <div className="p-4 border rounded bg-red-100 flex flex-wrap justify-center mt-4 border-white">
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
            wordBreak: 'break-word', // Ensure long words break properly
          }}
        >
          {token}
        </span>
        {' '}
      </span>
    ))}
  </div>
)}


            <button onClick={saveResults} className="mt-4 px-4 py-2 rounded-md bg-green-500 text-white">
              Save Results
            </button>

          </div>
        </div>
      </div>
    )
  );
}

export default UserDetail;
