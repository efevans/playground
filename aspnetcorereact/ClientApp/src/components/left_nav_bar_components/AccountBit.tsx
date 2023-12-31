import { useContext } from "react";
import LoginContext from "../../LoginContext";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import UserFrame from "./UserFrame";
import React from "react";

const AccountBit = () => {
  const loginContext = useContext(LoginContext);
  const loggedIn = loginContext.user !== null;

  return (
    <div id="account-bit">
      {loggedIn && <UserFrame />}
      <Nav vertical>
        <NavItem>
          {!loggedIn ? (
            <NavLink tag={Link} to={"/login"} className="highlightable">
              Login
            </NavLink>
          ) : (
            <NavLink
              tag={Link}
              onClick={() => {
                loginContext.setUser(null);
                localStorage.removeItem("token");
                console.log("Logged Out");
              }}
              className="highlightable"
            >
              Logout
            </NavLink>
          )}
        </NavItem>
      </Nav>
    </div>
  );
};

export default AccountBit;
