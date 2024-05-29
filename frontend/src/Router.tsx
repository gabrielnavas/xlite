import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

export const routePaths = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
  },
  home: "/",
  profile: "/:username",
}

const routes = createBrowserRouter([{
  path: routePaths.profile,
  element: <Profile />,
}, {
  path: routePaths.home,
  element: <Home />,
}, {
  path: routePaths.auth.register,
  element: <Register />,
}, {
  path: routePaths.auth.login,
  element: <LoginPage />,
}]);


const RouterCustom = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default RouterCustom;