import React, { Component } from 'react';
import Post from './components/Post';
import axios from 'axios';
import { connect } from 'react-redux'; // используется, когда нужно при экспорте требуется подключить что-то
import {
  Container, Header, Button, Item,
  Dimmer, Loader, Image, Segment
} from 'semantic-ui-react'

class App extends Component {

  // constructor(props) {
  //   super(props);
  // };

  fetchPosts() {
    const { setPosts } = this.props;
    setPosts([]);
    axios
      .get('https://5ea4b7ee2d86f00016b453f1.mockapi.io/posts')
      .then(({ data }) => {
        setPosts(data);
      });
  };

  componentWillMount() { // когда компонент будет монтироваться
    this.fetchPosts();
  };

  regionText(text) {
    switch (text) {
      case 'Krasnodar':
        return 'Краснодар';
      case 'Sochi':
        return 'Сочи';
      case 'Novorossiysk':
        return 'Новороссийск';
      default:
    }
  }



  // ToDo: реализовать переход между регионами. Открытие определенной новости. Подключить базу. Сделать header

  render() {
    const { posts } = this.props;
    const { items } = posts;
    return (
      <Container>
        <Header as='h2'>Regions: {this.regionText(this.props.regions.region)}</Header>
        <Button.Group basic>
          <Button onClick={() => this.props.changeRegion('Krasnodar')}>Krasnodar</Button>
          <Button onClick={() => this.props.changeRegion('Sochi')}>Sochi</Button>
          <Button onClick={() => this.props.changeRegion('Novorossiysk')}>Novorossiysk</Button>
        </Button.Group>
        <Item.Group divided>
          {
            !items.length ? (
              <Segment Loader>
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
            ) : (
                items.map((item, key) => (
                  <Post
                    key={key}
                    {...item} // все свойства из item будут присвоены компоненту
                  />
                ))
              )
          }
        </Item.Group>
      </Container >
    );
  }
}

const state = props => {
  // console.log(props);
  return props;
};

const actions = (dispatch) => ({
  setPosts: (data) => dispatch({
    type: 'SET_POSTS',
    payload: data,
  }),
  changeRegion: (name) => dispatch({
    type: 'CHANGE_REGION',
    payload: name,
  })
});

export default connect(state, actions)(App);
