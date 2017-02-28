import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export  class NavigationBar extends React.Component {
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

// import React from 'react';
// import App from '../App.jsx'
// import {
//   Page,
//   Splitter,
//   SplitterSide,
//   SplitterContent,
//   Toolbar,
//   ToolbarButton,
//   BackButton,
//   Icon,
//   List,
//   ListItem,
//   ListHeader,
//   Navigator
// } from 'react-onsenui';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// /*  Components  */
// import HomeView from '../HomeView.jsx'
// import MapViewer from '../MapViewer/MapViewer.jsx';
// import Group from '../Group/Group.jsx';
// import VenueSchedule from '../VenueSchedule/VenueSchedule.jsx';
// import PersonalAgenda from '../VenueSchedule/PersonalAgenda.jsx';
// import ChooseVenue from '../InitConfig/ChooseVenue.jsx';
// import CreateGroup from '../InitConfig/CreateGroup.jsx';
// import InviteFriends from '../InitConfig/InviteFriends.jsx';

// export class NavigationBar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isOpen: false
//     };
//   }

//   hide() {
//     this.setState({
//       isOpen: false
//     });
//   }

//   show() {
//     this.setState({
//       isOpen: true
//     });
//   }

//   gotoComponent(component) {
//     console.log(component)
//     this.props.navigator.pushPage({comp: component});
//   }

//   renderToolbar() {
//     return (
//       <Toolbar>
//         <div className='left'>
//           <BackButton>Back</BackButton>
//         </div>
//         <div className='center'>
//           Totem
//         </div>
//         <div className='right'>
//           <ToolbarButton onClick={this.show.bind(this)}>
//             <Icon icon='ion-navicon, material:md-menu' />
//           </ToolbarButton>
//         </div>
//       </Toolbar>
//     );
//   }

//   render() {
//     return (
//       <Page>
//         <Splitter>
//           <SplitterSide
//             side='right'
//             isOpen={this.state.isOpen}
//             onClose={this.hide.bind(this)}
//             onOpen={this.show.bind(this)}
//             collapse={true}
//             width={240}
//             isSwipeable={true}>
//             <Page>
//               <List
//                 dataSource={[
//                   { name: 'Group', component: Group },
//                   { name: 'Map', component: MapViewer }, 
//                   { name: 'Agenda', component: PersonalAgenda }, 
//                   { name: 'Schedule', component: VenueSchedule },
//                   { name: 'Venue', component: ChooseVenue }
//                 ]}
//                 renderHeader={() => <ListHeader>Menu</ListHeader>}
//                 renderRow={(row) => 
//                   <ListItem 
//                     key={row.name} 
//                     modifier='longdivider' 
//                     tappable onClick={() => {
//                       this.hide.bind(this)()
//                       this.gotoComponent.bind(this, row.component)()
//                     }}>{row.name}
//                   </ListItem>}
//               />
//             </Page>
//           </SplitterSide>

//           <SplitterContent>
//             <Page renderToolbar={this.renderToolbar.bind(this)}>
//               <Route exact path="/" component={HomeView}/>
//               <Route path="/group" component={Group}/>
//               <Route path="/map" component={MapViewer}/>
//               <Route path="/agenda" component={PersonalAgenda}/>
//               <Route path="/schedule" component={VenueSchedule}/>
//               <Route path="/choosevenue" component={ChooseVenue}/>
//               <Route path="/creategroup" component={CreateGroup}/>
//               <Route path="/invite" component={InviteFriends}/>
//             </Page>
//           </SplitterContent>
//         </Splitter>
//       </Page>
//     );
//   }
// }

// export default class extends React.Component {
//   renderPage(route, navigator) {
//     const props = route.props || {};
//     props.navigator = navigator;

//     return React.createElement(route.component, props);
//   }

//   render() {
//     return (
//       <Navigator
//         initialRoute={{component: HomeView}}
//         renderPage={this.renderPage}
//       />
//     );
//   }
// }












