import { App } from "@/app/App";
import { createBrowserRouter } from "react-router-dom";
// @ts-expect-error
import shopRoutes from "shop/router";
// @ts-expect-error
import adminRoutes from "admin/router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...shopRoutes, ...adminRoutes],
  },
]);
