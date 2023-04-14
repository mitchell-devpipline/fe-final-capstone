import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
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
