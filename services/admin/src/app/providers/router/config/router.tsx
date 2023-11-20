import { App } from "@/app/App";
import { About } from "@/pages/About";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  ADMIN_ROOT,
  adminRoutes,
} from "@packages/shared/src/routes/adminRoutes";

const routes = [
  {
    path: ADMIN_ROOT,
    element: <App />,
    children: [
      {
        path: adminRoutes.about(),
        element: (
          <Suspense fallback={"Loading..."}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
