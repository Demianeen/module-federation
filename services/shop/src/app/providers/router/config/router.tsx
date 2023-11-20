import { App } from "@/app/App";
import { Shop } from "@/pages/Shop";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SHOP_ROOT, shopRoutes } from "@packages/shared/src/routes/shopRoutes";

const routes = [
  {
    path: SHOP_ROOT,
    element: <App />,
    children: [
      {
        path: shopRoutes.main(),
        element: (
          <Suspense fallback={"Loading..."}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: shopRoutes.second(),
        element: <h1>Second</h1>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
