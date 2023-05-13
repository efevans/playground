import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export default class Home extends Component {
  render() {
    return (<>
      <NavMenu />
      <Container>
        <Outlet />
      </Container>
    </>)
  }
} 