import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons"

const NavBar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 z-10 left-0 right-0 bg-gray-900 w-full h-16 justify-between flex items-center border-b-2 border-gray-500 py-10">
      <Link to="/">
        <img src={require('../Assets/Images/Logo-Ver.png')} className="h-14 ml-10" />
      </Link>
      <Link to="/cart">
        <div className="flex text-white/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="mediumseagreen"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <FontAwesomeIcon className=" text-green-600 " icon={faCartPlus} />
          </svg>
          {cartTotalQuantity > 0 &&
            <span className="bag-quantity">
              <span>{cartTotalQuantity}</span>
            </span>
          }
        </div>
      </Link>
      {auth._id ? (
        <Links>
          {auth.isAdmin ? (
            <div className="flex text-xl">
              <Link className="bg-green-600 rounded-lg px-5 py-2 text-lg font-bold text-gray-100 transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600" to="/admin">
                Admin
              </Link>
            </div>
          ) : null}
          <div
            className="flex pr-6 text-xl"
            onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("Logged out!", { position: "bottom-left" });
            }}
          >
            <span className="bg-green-600 ml-2 rounded-lg px-5 py-2 text-lg font-bold text-gray-100 transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600">
              Logout
            </span>
          </div>
        </Links>
      ) : (
        <AuthLinks>
          <div className="pr-6">
            <Link to="/login">
              <button type="button" className="bg-green-600 rounded-lg px-5 py-2 text-lg font-bold text-gray-100 transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="bg-green-600 ml-2 rounded-lg px-5 py-2 text-lg font-bold text-gray-100 transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                Register
              </button>
            </Link>
          </div>
        </AuthLinks>
      )}
    </nav>
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child {
    }
  }
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    
  }
`;
