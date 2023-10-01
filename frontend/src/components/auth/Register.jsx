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
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md">
        <div
          className="bg-cover bg-center h-32 mb-6"
          style={{
            backgroundImage: `url(${COVER_IMAGE})`,
            opacity: 0.5, 
          }}
        ></div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Register on AstroFlaz</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
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
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-600"
                  placeholder="Nama"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
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
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-600"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
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
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-600"
                  placeholder="No Hp"
                  onChange={(e) => setUser({ ...user, nohp: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
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
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-600"
                  placeholder="Address"
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
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
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-600"
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
                required
              />
              <label htmlFor="check" className="text-gray-700">
                Dengan mencentang ini, Anda setuju dengan{" "}
                <Link to={"/"}>syarat & ketentuan</Link> kami
              </label>
            </div>
            <button
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-500 transition duration-300 w-full"
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
