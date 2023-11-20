import { Link, Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div data-testid={"App.DataTestId"}>
      <h1>SHOP module</h1>
      <Outlet />
    </div>
  );
};
