import { Outlet } from "react-router-dom";
import { AdminHeaders } from "./CommonStyled";

const Products = () => {

  return (
    <div>
      <AdminHeaders>
        <h2>Products</h2>
      </AdminHeaders>
      <Outlet />
    </div>
  );
};

export default Products;
