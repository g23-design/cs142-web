import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

function AddCommentDialog({ open, onClose, photoId }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (comment.trim() === "") {
      alert("Сэтгэгдэл хоосон байж болохгүй.");
      return;
    }

    try {
      await axios.post(`/commentsOfPhoto/${photoId}`, {
        comment: comment,
      });
      onClose();
    } catch (error) {
      console.error("Сэтгэгдэл нэмэхэд алдаа гарлаа: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Сэтгэгдэл нэмэх</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Сэтгэгдэл"
          type="text"
          fullWidth
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Цуцлах</Button>
        <Button onClick={handleAddComment} color="primary">Нэмэх</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCommentDialog;
