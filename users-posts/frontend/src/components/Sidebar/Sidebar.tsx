import { List, ListItem, ListItemIcon, ListItemText, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Explore', icon: <SearchIcon /> },
    { text: 'Notifications', icon: <NotificationsIcon /> },
    { text: 'Messages', icon: <MailIcon /> },
    { text: 'Bookmarks', icon: <BookmarkIcon /> },
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
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
          </IconButton>
        </ListItem>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Sidebar;
