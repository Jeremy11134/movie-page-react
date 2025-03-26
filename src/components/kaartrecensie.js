import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

const CardComponent = ({ title, description, image, onRatingUpdate }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const storedRating = localStorage.getItem(`rating-${title}`);
    const storedReview = localStorage.getItem(`review-${title}`);
    if (storedRating) setRating(parseFloat(storedRating));
    if (storedReview) setReviewText(storedReview);
  }, [title]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    localStorage.setItem(`rating-${title}`, newValue);
    if (onRatingUpdate) onRatingUpdate(title, newValue);
  };

  const handleReviewChange = (event) => {
    const newReview = event.target.value;
    setReviewText(newReview);
    localStorage.setItem(`review-${title}`, newReview);
  };

  return (
    <Box>
      <Card className="card-container" onClick={handleOpen}>
        <CardMedia component="img" image={image} alt={title} />
      </Card>

      <Modal open={open} onClose={handleClose} className="modal-boxs">
        <Box className="modal-contents">
          <CardMedia component="img" className="card-image" image={image} alt={title} />
          <Typography variant="h5" component="div" className="title-typography">
            {title}
          </Typography>
          <Typography variant="body2" className="description-typography">
            {description}
          </Typography>

          <Box className="rating-box">
            <Rating name="user-rating" value={rating} precision={0.5} onChange={handleRatingChange} />
          </Box>

          <TextField
            label="Your Review"
            multiline
            rows={3}
            value={reviewText}
            onChange={handleReviewChange}
            className="review-textfield"
          />

          <Button onClick={handleClose} className="close-button" variant="contained" fullWidth>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CardComponent;
