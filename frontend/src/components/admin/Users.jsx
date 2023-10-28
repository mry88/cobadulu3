import { Outlet } from "react-router-dom";
import { AdminHeaders } from "./CommonStyled";
import UsersList from "./lists/UsersList";

const Users = () => {
  return (
    <div>
      <AdminHeaders>
        <h2>Users</h2>
      </AdminHeaders>
      <Outlet />
    </div>
  );
};

export default Users;
