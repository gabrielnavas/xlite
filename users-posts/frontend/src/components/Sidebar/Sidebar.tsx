import { List, ListItem, ListItemIcon, ListItemText, IconButton, Container, Snackbar, Alert, AlertColor, ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import LogoutIcon from '@mui/icons-material/Logout';
import localAuthManager from '../../services/LocalAuthManager';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../Router';
import { useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [snack, setSnack] = useState({open: false, message: '', severity: ''});

  const logout = () => {
    localAuthManager().logout();
    setSnack({message: 'Bye bye!', open: true, severity: 'success'});
    setTimeout(() => navigate(routePaths.auth.login)
    , 2000)
  }

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, onClick: () => {}},
    { text: 'Explore', icon: <SearchIcon />, onClick: () => {} },
    { text: 'Notifications', icon: <NotificationsIcon />, onClick: () => {} },
    { text: 'Messages', icon: <MailIcon />, onClick: () => {} },
    { text: 'Bookmarks', icon: <BookmarkIcon />, onClick: () => {} },
    { text: 'Profile', icon: <PersonIcon />, onClick: () => {} },
    { text: 'Logout', icon: <LogoutIcon />, onClick: logout },
  ];

  return (
    <Container
      sx={{
        width: 240,
        position: 'sticky',
        top: 30,
        left: 0,
        height: '100vh', // Para ocupar a altura total da viewport
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
      }}
    >
      <List>
        <ListItem>
          <IconButton>
            <AcUnitIcon color="primary" />
            <span style={{  marginLeft: '0.5rem', color: '#1DA1F2B9'}}>xlite</span>
          </IconButton>
        </ListItem>
        {menuItems.map((item, index) => (
          <ListItemButton key={index} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Snackbar
        open={snack.open}
        onClose={() => setSnack({open: false, message: '', severity: ''})}
        autoHideDuration={5000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
          <span style={{ fontSize:'1.1rem' }}>{snack.message}</span>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Sidebar;
