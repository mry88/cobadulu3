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
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-100">
        {/* Background Image */}
        <div
          className="bg-cover bg-center h-32 mb-6 rounded-lg"
          style={{
            backgroundImage: `url(${COVER_IMAGE})`,
            opacity: 0.8, // Adjust the opacity as needed
          }}
        ></div>

        {/* Login Form */}
        <div className="bg-gray-200 rounded-lg p-6 text-dark">
          <h2 className="text-2xl font-semibold text-center mb-4 font-sans">Log in to your account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              <label htmlFor="password" className="block text-dark text-sm font-bold mb-2">
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
                  className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
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
                className="mr-2 w-4 h-4 border-2 border-gray-400 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 bg-gray-100 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
              />
              <label htmlFor="remember" className="font-bold text-dark">
                Remember Me
              </label>
            </div>
            <button
              className="w-full focus:outline-none text-white bg-green-600 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 font-medium rounded-lg text-sm px-4 py-2 mr-2"
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
