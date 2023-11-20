import { Link, Outlet } from "react-router-dom";
import { adminRoutes } from "@packages/shared/src/routes/adminRoutes";
import { shopRoutes } from "@packages/shared/src/routes/shopRoutes";

export const App = () => {
  return (
    <div data-testid={"App.DataTestId"}>
      <h1>App</h1>
      <Link to={adminRoutes.about()}>About</Link>
      <br />
      <Link to={shopRoutes.main()}>Shop</Link>
      <Outlet />
    </div>
  );
};
