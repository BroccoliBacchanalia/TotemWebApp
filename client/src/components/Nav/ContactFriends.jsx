// import React from 'react'
// import { Button, Header, Icon, Modal, Dimmer } from 'semantic-ui-react'

// const ContactFriends = () => (
//   <Dimmer>
//   <Modal dimmer='true' defaultOpen='true' basic size='small'>
//     <Header icon='Child' content='Need some help?' />
//     <Modal.Content>
//       <p>Are you sure you want to send an emergency signal to your group?</p>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button basic color='red' inverted>
//         <Icon name='remove' /> No
//       </Button>
//       <Button color='green' inverted>
//         <Icon name='checkmark' /> Yes
//       </Button>
//     </Modal.Actions>
//   </Modal>
//   </Dimmer>
// )

// export default ContactFriends

import React, { Component } from 'react'
import { Button, Dimmer, Header, Image, Segment } from 'semantic-ui-react'

export default class ContactFriends extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state

    return (
      <div>
        <Dimmer.Dimmable as={Segment} dimmed={active}>
          <Dimmer active={active} onClickOutside={this.handleHide} />

          <Header as='h3'>Overlayable Section</Header>

          <Image.Group size='small' className='ui small images'>
            <Image src='/assets/images/wireframe/image.png' />
            <Image src='/assets/images/wireframe/image.png' />
            <Image src='/assets/images/wireframe/image.png' />
          </Image.Group>

          <Image size='medium' src='/assets/images/wireframe/media-paragraph.png' />
        </Dimmer.Dimmable>

        <Button.Group>
          <Button icon='plus' onClick={this.handleShow} />
          <Button icon='minus' onClick={this.handleHide} />
        </Button.Group>
      </div>
    )
  }
}