import { Link } from "react-router-dom";
import { useTheme } from "../../theme-context";

const NavBar = () => {
  const theme = useTheme();
  const changeTheme = () =>{
    theme.toggleTheme()
    // console.log()
  }
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <button onClick={changeTheme} className="switch">{`Toggle theme`}</button>
    </nav>
  );
};

export default NavBar;
