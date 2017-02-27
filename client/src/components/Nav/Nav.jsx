import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import localStyles from './NavStyles.css';

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
            <div className={localStyles.navRow}>
              <NavLink to="/group" onClick={clickToggle}>
                <div>Group</div>
              </NavLink>
              <NavLink to="/map" onClick={clickToggle}>
                <div>Map</div>
              </NavLink>
            </div>
            {this.props.venueId ?
              <div className={localStyles.navRow}>
                <NavLink to="/agenda" onClick={clickToggle}>
                  <div>Agenda</div>
                </NavLink>
                <NavLink to="/schedule" onClick={clickToggle}>
                  <div>Schedule</div>
                </NavLink>
              </div> : '' }
            <div className={localStyles.navRow}>
              <NavLink to="/choosevenue" onClick={clickToggle}>
                <div>ChooseVenue</div>
              </NavLink>
              <NavLink to="/creategroup" onClick={clickToggle}>
                <div>Create</div>
              </NavLink>
            </div>
            <div className={localStyles.navRow}>
              <NavLink to="/invite" onClick={clickToggle}>
                <div>Invite</div>
              </NavLink>
              <NavLink to="/signout" onClick={clickToggle}>
                <div>Logout</div>
              </NavLink>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function clickToggle() {
  document.getElementsByClassName('navbar-toggle')[0].click();
}
