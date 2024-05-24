import { RouterProvider, createBrowserRouter } from "react-router-dom";

import FeedPage from "./pages/FeedPage";
import Register from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export const routePaths = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
  },
  home: "/"
}

const routes = createBrowserRouter([{
  path: routePaths.home,
  element: <FeedPage />,
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