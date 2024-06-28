import React, { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const DataPage = () =>{
  const [history, setHistory] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showEditNotification, setShowEditNotification] = useState(false); // State for edit success notification
  const [editFormData, setEditFormData] = useState({
    text: '',
    tokens: '',
    characters: '',
    timestamp: '',
  });

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('tokenizerHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const deleteEntry = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1); // Remove the entry at the specified index
    setHistory(updatedHistory);
    localStorage.setItem('tokenizerHistory', JSON.stringify(updatedHistory));
    setIsDeleteOpen(false); // Close delete confirmation dialog
    setShowDeleteNotification(true); // Show delete notification
    setTimeout(() => {
      setShowDeleteNotification(false); // Hide notification after 3 seconds
    }, 3000);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after deletion
  };

  const editEntry = (index) => {
    setEditIndex(index); // Set the index of the entry to edit
    const { text, tokens, characters, timestamp } = history[index];
    setEditFormData({ text, tokens, characters, timestamp });
    setIsEditOpen(true); // Open edit confirmation dialog or directly edit
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    let updatedTokens = value.split(' ').filter(Boolean).length.toString();
    let updatedCharacters = value.length.toString();
    setEditFormData(prevState => ({
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
    setIsEditOpen(false); // Close edit confirmation dialog
    setShowEditNotification(true); // Show edit success notification
    setTimeout(() => {
      setShowEditNotification(false); // Hide notification after 3 seconds
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 flex-1">
      <h2 className="text-2xl font-bold mb-4 mt-4">Tokenizer History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No history available.</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="mb-4 p-4 border rounded bg-gray-100 flex justify-between items-center">
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

      {/* Delete Confirmation Dialog */}
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

      {/* Edit Confirmation Dialog */}
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

      {/* Delete Notification */}
      {showDeleteNotification && (
        <div className="fixed top-0 left-0 w-full text-red-500 py-2 px-4 text-center">
          Data deleted successfully!
        </div>
      )}

      {/* Edit Notification */}
      {showEditNotification && (
        <div className="fixed top-0 left-0 w-full text-blue-500 py-2 px-4 text-center">
          Data edited successfully!
        </div>
      )}
    </div>
  );
}

export default DataPage;
