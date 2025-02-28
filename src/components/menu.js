import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // React Router navigation hook

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to navigate
  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography 
          sx={{ minWidth: 100, cursor: 'pointer' }} 
          onClick={() => handleNavigate('/home')}
        >
          Home
        </Typography>
        <Typography 
          sx={{ minWidth: 100, cursor: 'pointer' }} 
          onClick={() => handleNavigate('/vestigingen')}
        >
          Vestigingen
        </Typography>
        <Typography 
          sx={{ minWidth: 100, cursor: 'pointer' }} 
          onClick={() => handleNavigate('/films')}
        >
          Films
        </Typography>
        <Typography 
          sx={{ minWidth: 100, cursor: 'pointer' }} 
          onClick={() => handleNavigate('/recensies')}
        >
          Recensies
        </Typography>
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1.5 },
        }}
      >
        <MenuItem onClick={() => handleNavigate('/home')}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigate('/vestigingen')}>Vestigingen</MenuItem>
        <MenuItem onClick={() => handleNavigate('/films')}>Films</MenuItem>
        <MenuItem onClick={() => handleNavigate('/recensies')}>Recensies</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleNavigate('/logout')}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
