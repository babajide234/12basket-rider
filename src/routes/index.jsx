import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { MainLayout } from "../layout/MainLayout";
import Login from "../pages/Auth/Login";
import Landing from "../pages/Landing";
import Map from "../pages/Map";
import Notification from "../pages/Notification";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>
    },
    {
      path:'/',
      element: <AuthLayout/>,
      children:[
        {
          path: 'login',
          element: <Login/>
        },
      ]
    },
    {
      path:'/',
      element: <MainLayout/>,
      children:[
        {
          path: 'map',
          element: <Map/>
        },
      ]
    },
    {
      path: "/notifications",
      element: <Notification/>
    },
])

export default router;