import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import { Link } from 'react-router';

export default RoomHeader = ({ roomTitle }) => (
  <div>
    <Navbar color="faded" light toggleable>
      <NavbarBrand>{roomTitle}</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/">HEEBO.CHAT</Link>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);