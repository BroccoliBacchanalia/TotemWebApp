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
            <NavItem eventKey={1} href="/">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// <NavMenu dispatch={this.props.dispatch}/>
//             <Route exact path="/" component={() => <div>User Schedule Holder</div>}/>
//             <Route path="/group" component={() => (
//               // <Group
//                 // dispatch={this.props.dispatch}
//                 // users={this.props.location.users}
//                 // userID={this.props.app.userFbId}
//                 <div>User Schedule Holder</div>
//               // />
//             )}/>
//             <Route path="/agenda" component={() => <div>User Schedule Holder</div>}/>
//             <Route path="/schedule" component={() => <div>User Schedule Holder</div>}/>
//             <Route path="/emergency" component={() => <div>Emergency Info Holder</div>}/>
//             <Route path="/choosevenue" component={() => <div>User Schedule Holder</div>}/>
//             <Route path="/create" component={() => <div>User Schedule Holder</div>}/>
//             <Route path="/invite" component={() => <div>User Schedule Holder</div>}/>
//           </div>
//         </Router>
