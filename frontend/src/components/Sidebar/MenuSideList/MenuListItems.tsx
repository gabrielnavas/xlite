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
import { routePaths } from "../../../Router"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { logout } from "../../../store/features/authSlice"
import { resetUser } from "../../../store/features/userSlice"
import { infoMessage, remoteFinish } from "../../../store/features/remoteRequestSlice"

const MenuListItems = () => {
  const [snack, setSnack] = useState<SnackProps>({} as SnackProps)

  const navigate = useNavigate();

  const userStore = useAppSelector(store => store.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetUser())
    dispatch(infoMessage({message: 'Bye bye!'}))
    setTimeout(() => dispatch(remoteFinish()), 3000)
  }

  const moveToProfile = async () => {
    navigate(routePaths.profile.replace(":username", userStore.data.username))
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
    { title: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
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