import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import Upload from "./components/Upload";
import VideoComponent from "./components/video";
import SingleVideo from "./components/SingleVideo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout here for the shared layout (Navbar + Outlet)
    children: [
      {
        path: "/",
        element: <Upload />,
      },
      {
        path: "/video",
        element: <VideoComponent />,
      },
      {
        path: "/video/:id",
        element: <SingleVideo />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
