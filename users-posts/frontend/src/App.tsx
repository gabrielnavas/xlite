import Auth from "./pages/Auth";
import FeedPage from "./pages/Feed";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([{
  path: "/",
  element: <FeedPage />,
}, {
  path: "/auth",
  element: <Auth />,
},]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
