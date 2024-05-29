import AcUnitIcon from "@mui/icons-material/AcUnit";
import { IconButton, ListItemButton, ListItemIcon, styled, useMediaQuery } from "@mui/material";

const FullHeader = styled(IconButton)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  paddingLeft: '1.5rem',
  width: '100%',
}));

const MenuHeader = () => {
  const matches900 = useMediaQuery('(max-width:900px)');

  const icon = <AcUnitIcon color="primary" />

  if (!matches900) {
    return (
      <FullHeader>
        {icon}
        <span style={{ marginLeft: '0.5rem', color: '#1DA1F2B9' }}>xlite</span>
      </FullHeader>
    )
  }

  return (
    <ListItemButton>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
    </ListItemButton>
  )
}

export default MenuHeader;