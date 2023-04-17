import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer">
      <NavLink exact to="/">
        Landing
      </NavLink>

      <NavLink to="/about">About</NavLink>

      <NavLink to="/contact">Contact</NavLink>

      <NavLink to="/gallery">Gallery</NavLink>

      <NavLink to="/show">Show</NavLink>
    </div>
  );
}