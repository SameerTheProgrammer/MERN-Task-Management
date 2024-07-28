import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeLayout />,
        children: [{ path: "", element: <HomePage /> }],
      },
      {
        path: "auth",
        element: <UnauthorizedLayout />,
      },
    ],
  },
]);
