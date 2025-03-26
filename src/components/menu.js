import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function AccountMenu() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false); 
  };

  return (
    <AppBar 
      position="static" 
      sx={{ backgroundColor: 'grey' }} 
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <IconButton 
          onClick={() => setDrawerOpen(true)} 
          sx={{ display: { xs: 'block', md: 'none' }, color: 'white' }} 
        >
          <MenuIcon />
        </IconButton>

        
        <Box 
          sx={{
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center', 
            flexGrow: 1,
            gap: 4 
          }}
        >
          {['Home', 'Vestigingen', 'Films', 'Recensies'].map((label) => (
            <Typography 
              key={label} 
              sx={{ 
                cursor: 'pointer', 
                color: 'white', 
                '&:hover': { color: '#f1c40f' } 
              }} 
              onClick={() => handleNavigate(`/${label.toLowerCase()}`)}
            >
              {label}
            </Typography>
          ))}
        </Box>
      </Toolbar>

      
      <Drawer
        anchor="left" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { backgroundColor: '#34495e', color: 'white' } }} 
      >
        <List sx={{ width: 250 }}>
          {['Home', 'Vestigingen', 'Films', 'Recensies'].map((label) => (
            <ListItem button key={label} onClick={() => handleNavigate(`/${label.toLowerCase()}`)}>
              <ListItemText 
                primary={label} 
                sx={{ '& span': { color: 'white' } }} 
              />
            </ListItem>
          ))}
          <Divider />
        </List>
      </Drawer>
    </AppBar>
  );
}
