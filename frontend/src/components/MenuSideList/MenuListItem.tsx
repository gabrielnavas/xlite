import { ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";

type Props = {
  onClick: () => void
  icon: React.ReactElement
  title: string
}

const MenuListItem = (props: Props) => {
  const matches900 = useMediaQuery('(max-width:900px)');

  return (
    <ListItemButton onClick={props.onClick}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      {
        !matches900 && (
          <ListItemText primary={props.title} />
        )
      }
    </ListItemButton>
  )
}

export default MenuListItem;