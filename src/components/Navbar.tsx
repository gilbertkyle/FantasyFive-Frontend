import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import type { RootState } from "../store";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = () => {
  const { username = "none" } = useSelector((state: RootState) => state.auth.user || "");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/enter">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <span>{username || "guest"}</span>
        </li>
        <li>
          <span onClick={handleLogout}>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
