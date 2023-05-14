import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const ContentLinks = () => {
  return (
    <div id="content-links">
      <Nav vertical>
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/users"}>
            Users
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ContentLinks;
