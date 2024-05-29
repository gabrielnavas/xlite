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
import localUserManager from "../../../services/LocalUserManager"

const MenuListItems = () => {
  const [snack, setSnack] = useState<SnackProps>({} as SnackProps)

  const navigate = useNavigate();

  const logout = () => {
    localAuthManager().logout()
    setSnack({ message: 'Bye bye!', open: true, severity: 'success' })
    setTimeout(() => {
      navigate(routePaths.auth.login)
    }, 2000)
  }

  const moveToProfile = async () => {
    const user = await localUserManager().getUserLogged()
    navigate(routePaths.profile.replace(":username", user.username))
  }

  const moveToHome = async () => {
    navigate(routePaths.home)
  }

  const menuItems = [
    { title: 'Home', icon: <HomeIcon />, onClick: moveToHome },
    { title: 'Explore', icon: <SearchIcon />, onClick: () => { } },
    { title: 'Notifications', icon: <NotificationsIcon />, onClick: () => { } },
    { title: 'Messages', icon: <MailIcon />, onClick: () => { } },
    { title: 'Bookmarks', icon: <BookmarkIcon />, onClick: () => { } },
    { title: 'Profile', icon: <PersonIcon />, onClick: moveToProfile },
    { title: 'Logout', icon: <LogoutIcon />, onClick: logout },
  ]

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