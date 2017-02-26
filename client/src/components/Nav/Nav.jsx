import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/">Totem</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><NavLink to="/group">Group</NavLink></NavItem>
            <NavItem eventKey={2}><NavLink to="/agenda">Agenda</NavLink></NavItem>
            <NavItem eventKey={2}><NavLink to="/map">Map</NavLink></NavItem>
            <NavItem eventKey={3}><NavLink to="/schedule">Schedule</NavLink></NavItem>
            <NavItem eventKey={5}><NavLink to="/choosevenue">ChooseVenue</NavLink></NavItem>
            <NavItem eventKey={6}><NavLink to="/create">Create</NavLink></NavItem>
            <NavItem eventKey={7}><NavLink to="/invite">Invite</NavLink></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/signout">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
