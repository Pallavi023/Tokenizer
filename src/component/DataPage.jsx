import React, { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const DataPage = () => {
  const [history, setHistory] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showEditNotification, setShowEditNotification] = useState(false);
  const [editFormData, setEditFormData] = useState({
    text: '',
    tokens: '',
    characters: '',
    timestamp: '',
  });

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('tokenizerHistory')) || [];
    setHistory(savedHistory);

    const handleStorageChange = () => {
      const updatedHistory = JSON.parse(localStorage.getItem('tokenizerHistory')) || [];
      setHistory(updatedHistory);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const deleteEntry = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    localStorage.setItem('tokenizerHistory', JSON.stringify(updatedHistory));
    setIsDeleteOpen(false);
    setShowDeleteNotification(true);
    setTimeout(() => {
      setShowDeleteNotification(false);
    }, 3000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editEntry = (index) => {
    setEditIndex(index);
    const { text, tokens, characters, timestamp } = history[index];
    setEditFormData({ text, tokens, characters, timestamp });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    let updatedTokens = value.split(' ').filter(Boolean).length.toString();
    let updatedCharacters = value.length.toString();
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
      tokens: updatedTokens,
      characters: updatedCharacters,
    }));
  };

  const handleEditConfirm = () => {
    const updatedHistory = [...history];
    updatedHistory[editIndex] = { ...editFormData, timestamp: new Date().toLocaleString() };
    setHistory(updatedHistory);
    localStorage.setItem('tokenizerHistory', JSON.stringify(updatedHistory));
    setIsEditOpen(false);
    setShowEditNotification(true);
    setTimeout(() => {
      setShowEditNotification(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 flex-1 overflow-y-auto" style={{ backgroundImage: `url('path_to_your_background_image')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="text-2xl text-white font-bold mb-4 mt-4">Tokenizer History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No history available.</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="mb-4 px-4 bg-white text-white bg-opacity-0 backdrop-filter backdrop-blur-lg border rounded shadow hover:bg-opacity-10 hover:shadow-lg flex justify-between items-center">
            <div>
              <p><strong>Text:</strong> {entry.text}</p>
              <p><strong>Tokens:</strong> {entry.tokens}</p>
              <p><strong>Characters:</strong> {entry.characters}</p>
              <p><strong>Timestamp:</strong> {entry.timestamp}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                setDeleteIndex(index);
                setIsDeleteOpen(true);
              }} className="text-red-500">
                <DeleteOutlineIcon />
              </button>
              <button onClick={() => editEntry(index)} className="text-blue-500">
                <EditIcon />
              </button>
            </div>
          </li>
          
          ))}
        </ul>
      )}

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this entry?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button onClick={() => deleteEntry(deleteIndex)} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            name="text"
            label="Text"
            type="text"
            fullWidth
            value={editFormData.text}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="tokens"
            name="tokens"
            label="Tokens"
            type="text"
            fullWidth
            value={editFormData.tokens}
            onChange={handleEditChange}
            disabled
          />
          <TextField
            margin="dense"
            id="characters"
            name="characters"
            label="Characters"
            type="text"
            fullWidth
            value={editFormData.characters}
            onChange={handleEditChange}
            disabled
          />
          <TextField
            margin="dense"
            id="timestamp"
            name="timestamp"
            label="Timestamp"
            type="text"
            fullWidth
            value={editFormData.timestamp}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditConfirm} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {showDeleteNotification && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Data deleted successfully!
          <button onClick={() => setShowDeleteNotification(false)} className="ml-auto">
            <svg className="w-4 h-4 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {showEditNotification && (
        <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded shadow-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Data edited successfully!
          <button onClick={() => setShowEditNotification(false)} className="ml-auto">
            <svg className="w-4 h-4 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default DataPage;
