// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//       localStorage.removeItem("authToken");
//       navigate("/login"); // Redirect to login
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
//     >
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;







import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LogoutButton = () => {
  const { logout } = useAuth(); // Use the logout function from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      logout(); // Clear authentication state
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
