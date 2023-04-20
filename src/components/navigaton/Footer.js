import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer">
      <NavLink exact to="/">
        Home
      </NavLink>

      <NavLink to="/about">About</NavLink>

      <NavLink to="/contact">Contact</NavLink>

      <NavLink to="/gallery">Gallery</NavLink>
    </div>
  );
}
