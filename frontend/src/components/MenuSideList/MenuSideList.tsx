import { List } from '@mui/material';

import MenuHeader from './MenuHeader';
import MenuListItems from './MenuListItems';

const MenuSideList = () => {
  return (
    <div>
      <List>
        <MenuHeader />
        <MenuListItems />
      </List>
    </div>
  )
}

export default MenuSideList;