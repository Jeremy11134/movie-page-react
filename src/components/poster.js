import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/poster.css';

const CardComponent = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="card-wrapper">
      <Card className="card-element" variant="outlined" onClick={handleOpen}>
        <CardMedia component="img" className="card-thumbnail" image={image} alt={title} />
      </Card>

      {/* Modal */}
      <Modal open={open} onClose={handleClose} className="modal-wrapper">
        <Box className="modal-box">
          <CardMedia component="img" className="modal-thumbnail" image={image} alt={title} />

          {/* Modal Content */}
          <Box className="modal-content">
            <Typography variant="h5" component="div" className="modal-title">
              {title}
            </Typography>
            <Typography variant="body2" className="modal-description">
              {description}
            </Typography>
          </Box>

          {/* Close Button */}
          <Box className="modal-footer">
            <Button onClick={handleClose} variant="contained" className="modal-close-button">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CardComponent;
