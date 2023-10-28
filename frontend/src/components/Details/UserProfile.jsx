import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";

const UserProfile = () => {
  const params = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/users/find/${params.id}`,
          setHeaders()
        );

        setUser({ ...res.data, password: "" });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      const res = await axios.put(
        `${url}/users/${params.id}`,
        {
          ...user,
        },
        setHeaders()
      );

      setUser({ ...res.data, password: "" });
      toast.success("Profile updated...", {
        position: "bottom-left",
      });

      setUpdating(false);
    } catch (err) {
      console.error(err);
      setUpdating(false);
      toast.error(err.response.data, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center pt-28">
      <div className="bg-gray-800 h-20 max-w-sm w-full rounded-lg p-8 shadow-md">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-white text-2xl font-bold mb-12">User Profile</h3>
            <div className="mb-4">
              {user.isAdmin ? (
                <span className="text-orange-300 bg-orange-300/10 px-2 py-1 rounded text-xs mr-2">
                  Admin
                </span>
              ) : (
                <span className="text-blue-300 bg-blue-300/10 px-2 py-1 rounded text-xs mr-2">
                  Customer
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-400 text-sm" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-gray-800 rounded border-2 border-gray-700 p-2 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-400 text-sm" htmlFor="email">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full bg-gray-800 rounded border-2 border-gray-700 p-2 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-400 text-sm" htmlFor="password">
                Password:
              </label>
              <input
                type="text"
                value={user.password}
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full bg-gray-800 rounded border-2 border-gray-700 p-2 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
            <button
              className="my-6 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {updating ? "Updating" : "Update Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
