import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faEye, faEyeSlash, faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import COVER_IMAGE from "./roket-refelct.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    nohp: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(registerUser(user));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center pt-[100px] pb-[30px]">
      <div className="bg-gray-100 w-full max-w-md p-6 rounded-lg shadow-lg">
        <div
          className="bg-cover bg-center h-32 mb-6 rounded-lg"
          style={{
            backgroundImage: `url(${COVER_IMAGE})`,
            opacity: 0.8, 
          }}
        ></div>

        <div className="bg-gray-200 rounded-lg p-6 text-dark">
          <h2 className="text-2xl font-semibold text-center mb-4">Register on AstroFlaz</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="name" className="block text-dark text-sm font-bold mb-2">
                Nama
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-600 mr-2"
                />
                <input
                  id="name"
                  type="text"
                  className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                  placeholder="Nama"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-dark text-sm font-bold mb-2">
                Email
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-600 mr-2"
                />
                <input
                  id="email"
                  type="email"
                  className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-dark text-sm font-bold mb-2">
                No HP
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-gray-600 mr-2"
                />
                <input
                  id="noHp"
                  type="tel"
                  className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                  placeholder="No Hp"
                  onChange={(e) => setUser({ ...user, nohp: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-dark text-sm font-bold mb-2">
                Alamat
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-gray-600 mr-2"
                />
                <input
                  id="address"
                  type="text"
                  className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                  placeholder="Address"
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-dark text-sm font-bold mb-2">
                Kata Sandi
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-600 mr-2"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                  placeholder="Kata Sandi"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-600 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
  
            <div className="flex gap-4 mt-1">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 border-2 border-gray-400 rounded focus:ring-3 focus:ring-blue-300 bg-gray-100 border-gray-400 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                required
              />
              <label htmlFor="check" className="text-dark">
                Dengan mencentang ini, Anda setuju dengan{" "}
                <Link to={"/"}>syarat & ketentuan</Link> kami
              </label>
            </div>
            <button
              className="w-full focus:outline-none text-white bg-green-600 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              type="submit"
            >
              {auth.registerStatus === "pending" ? "Mendaftar..." : "Daftar"}
            </button>
            {auth.registerStatus === "rejected" ? (
              <p className="text-red-600 text-center">{auth.registerError}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
