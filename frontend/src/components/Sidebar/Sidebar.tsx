import { Container, styled } from '@mui/material';
import MenuSideList from './MenuSideList/MenuSideList';

const ContainerCustom = styled(Container)(() => ({
  width: 240,
  position: 'sticky',
  top: 30,
  left: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 0,
}));

const Sidebar = () => {
  return (
    <ContainerCustom>
      <MenuSideList />
    </ContainerCustom>
  )
};

export default Sidebar;
