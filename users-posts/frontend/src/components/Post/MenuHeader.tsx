import { MouseEvent, useState } from "react";

import { Delete } from "@mui/icons-material";
import { Menu, PopoverOrigin } from "@mui/material";

import MenuItemCustom from "./MenuItemHeader";
import MenuButtonHeader from "./MenuButtonHeader";

type Props = {
  openOnRemoveQuestionShield: () => void
}

const MenuHeader = ({ openOnRemoveQuestionShield }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const anchorOrigin = {
    vertical: 'top',
    horizontal: 'left',
  } as PopoverOrigin

  const transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  } as PopoverOrigin

  return (
    <div>
      <MenuButtonHeader onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}>

        <MenuItemCustom
          icon={<Delete />}
          isDanger
          label="Remove"
          onClick={openOnRemoveQuestionShield}
        />
      </Menu>
    </div>
  )
}

export default MenuHeader;