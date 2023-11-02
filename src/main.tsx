import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TimeMatrixPage from "@/pages/TimeMatrixPage.tsx";
import RootLayout from "@/pages/RootLayout.tsx";
import AccomplishPage from "@/pages/AccomplishPage.tsx";
import "@/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TimeMatrixPage /> },
      { path: "accomplishment", element: <AccomplishPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
