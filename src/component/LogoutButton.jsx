
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
     <LogoutIcon />
    </button>
  );
};

export default LogoutButton;
