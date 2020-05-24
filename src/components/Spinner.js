import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class Load extends Component {
  render() {
    return (
      <Segment Loader className="spinner">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Dimmer active inverted>
          <Loader inverted size='large' content="Загрузка..." />
        </Dimmer>
      </Segment>
    )
  }
}

export default Load;