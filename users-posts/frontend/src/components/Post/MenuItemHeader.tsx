import { MenuItem } from "@mui/material";
import {  common, red } from "@mui/material/colors";

type Props = {
  icon: React.ReactElement;
  label: string;
  onClick: () => void
  isDanger: boolean
}

const MenuItemCustom = ({ icon, label, onClick, isDanger }: Props) => {
  return (
    <MenuItem style={{ color: isDanger ? red[400] : common.white }} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </MenuItem>
  )
}

export default MenuItemCustom;