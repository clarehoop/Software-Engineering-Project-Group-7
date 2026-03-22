import NavBar from "./components/NavBar/navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />  
    </>
  );
}
export default Layout;