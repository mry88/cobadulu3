import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt, FaBook, FaBarcode, FaBoxOpen } from "react-icons/fa";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>Akses ditolak. Bukan Admin!</p>;

  return (
    <StyledDashboard>
      <SideNav>
       <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          <FaTachometerAlt /> Ringkasan
        </NavLink> 
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          <FaClipboard /> Pesanan
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
          <FaClipboard /> Produk
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          <FaUsers /> Pengguna
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/features"
        >
          <FaBoxOpen /> Fitur
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/category"
        >
          <FaBook /> Kategori
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const MainNavbar = styled.div`
  /* Gaya untuk navbar utama Anda di sini */
  z-index: 2; /* Sesuaikan nilai z-index agar lebih tinggi daripada navbar samping */
`;

const SideNav = styled.div`
  /* Gaya untuk navbar samping Anda di sini */
  border-right: 1px solid gray;
  height: 100%; /* Use 100% height */
  position: fixed; /* Fixed position */
  overflow-y: auto; /* Allow vertical scrolling if content overflows */
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  top: 70px; /* Adjust top position to accommodate MainNavbar height */

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1.5rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;

    svg {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }

  z-index: 1; /* Lower z-index to ensure it's behind MainNavbar */
`;


const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;

