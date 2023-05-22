import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

interface ContentLink {
  title: string;
  link: string;
}

interface ContentLinksArray extends Array<ContentLink> {}

const ContentLinks = () => {
  const links: ContentLinksArray = [
    { title: "Home", link: "/" },
    { title: "Users", link: "/users" },
  ];

  return (
    <div id="content-links">
      <Nav vertical>
        {links.map((link: ContentLink) => {
          return (
            <NavItem>
              <NavLink tag={Link} to={link.link} className="highlightable">
                {link.title}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </div>
  );
};

export default ContentLinks;
