import { Outlet} from "react-router-dom";
import { AdminHeaders} from "./CommonStyled";

const Features = () => {

  return (
    <div>
      <AdminHeaders>
        <h2>Features</h2>
      </AdminHeaders>
      <Outlet />
    </div>
  );
};

export default Features;
