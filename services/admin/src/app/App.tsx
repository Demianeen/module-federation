import { Link, Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div data-testid={"App.DataTestId"}>
      <h1>ADMIN module</h1>
      <Outlet />
    </div>
  );
};
