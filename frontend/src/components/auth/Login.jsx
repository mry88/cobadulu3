import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import COVER_IMAGE from "./roket.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(loginUser(user));
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md">
        {/* Background Image */}
        <div
          className="bg-cover bg-center h-32 mb-6"
          style={{
            backgroundImage: `url(${COVER_IMAGE})`,
            opacity: 0.5, // Adjust the opacity as needed
          }}
        ></div>

        {/* Login Form */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Log in to your account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                Password
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
                  placeholder="Password"
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
            {/* ...Other form elements */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-700">
                Remember Me
              </label>
            </div>
            <button
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-500 transition duration-300 w-full"
              type="submit"
            >
              {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
            </button>
            {auth.loginStatus === "rejected" && (
              <p className="text-red-600 text-center">{auth.loginError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
