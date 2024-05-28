import { Container } from '@mui/material';
import MenuSideList from '../MenuSideList/MenuSideList';

const Sidebar = () => {
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
      <MenuSideList />
    </Container>
  )
};

export default Sidebar;
