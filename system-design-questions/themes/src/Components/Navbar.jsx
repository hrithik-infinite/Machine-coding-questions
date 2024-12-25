import { Link } from "react-router-dom";
import { useTheme } from "../Context/theme-context";

const Navbar = () => {
  const theme = useTheme();
  const changeTheme = () => {
    theme.toggleTheme();
    console.log(theme.theme);
  };
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <button onClick={changeTheme}>Change Theme</button>
    </nav>
  );
};

export default Navbar;
