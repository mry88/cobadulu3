import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Category = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>Category</h2>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Category;
