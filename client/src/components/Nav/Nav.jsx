import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default class NavigationBar extends React.Component {
  render() {
    console.log()
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
            <NavLink to="/group">Group</NavLink>
            <NavLink to="/map">Map</NavLink>
            {this.props.venueId ? <NavLink to="/agenda">Agenda</NavLink> : ''}
            {this.props.venueId ? <NavLink to="/schedule">Schedule</NavLink> : ''}
            <NavLink to="/choosevenue">ChooseVenue</NavLink>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/invite">Invite</NavLink>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/signout">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
