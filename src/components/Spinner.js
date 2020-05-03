import React, { Component } from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default class Load extends Component {
  render() {
    return (
      <Segment Loader style={{width: '1110px'}}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Dimmer active inverted>
          <Loader inverted size='large'>Loading</Loader>
        </Dimmer>
        <Image src='/images/wireframe/short-paragraph.png' />
      </Segment>
    )
  }
}