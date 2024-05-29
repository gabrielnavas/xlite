import { useNavigate } from "react-router-dom"
import { useState } from "react"

import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'


import SnackBarMessage, { SnackProps } from "./SnackBarMessage"
import MenuListItem from "./MenuListItem"
import localAuthManager from "../../../services/LocalAuthManager"
import { routePaths } from "../../../Router"

const MenuListItems = () => {
  const [snack, setSnack] = useState<SnackProps>({} as SnackProps)

  const logout = () => {
    localAuthManager().logout()
    setSnack({ message: 'Bye bye!', open: true, severity: 'success' })
    setTimeout(() => {
      navigate(routePaths.auth.login)
    }, 2000)
  }

  const menuItems = [
    { title: 'Home', icon: <HomeIcon />, onClick: () => { } },
    { title: 'Explore', icon: <SearchIcon />, onClick: () => { } },
    { title: 'Notifications', icon: <NotificationsIcon />, onClick: () => { } },
    { title: 'Messages', icon: <MailIcon />, onClick: () => { } },
    { title: 'Bookmarks', icon: <BookmarkIcon />, onClick: () => { } },
    { title: 'Profile', icon: <PersonIcon />, onClick: () => { } },
    { title: 'Logout', icon: <LogoutIcon />, onClick: logout },
  ]

  const navigate = useNavigate()

  return (
    <div>
      {menuItems.map((item) => (
        <MenuListItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          onClick={item.onClick}
        />
      ))}
      <SnackBarMessage
        open={snack.open}
        setSnack={setSnack}
        snack={snack}
      />
    </div>
  )
}

export default MenuListItems