import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; // используется, когда нужно при экспорте требуется подключить что-то
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

  fetchPosts() {
    const { setPosts } = this.props;
    setPosts([]);
    axios
      .get('http://localhost:8080/posts')
      .then(({ data }) => {
        setPosts(data);
        console.log('DATA', data)
      });
  };

  componentDidMount() { // когда компонент будет монтироваться
    this.fetchPosts();
  };

  render() {
    const { posts } = this.props;
    let { items } = posts;
    return (
      <>
        <h2 className="text-center">Все новости</h2>
        <Container style={{ display: 'flex', flex: 1 }}>
          <Row>
            {
              !items.length ? (
                <Spinner />
              ) : (
                  items.map((item, key) => (
                    <Post
                      key={key}
                      {...item} // все свойства из item будут присвоены компоненту
                    />
                  ))
                )
            }
          </Row>
        </Container>
      </>
    )
  }
}

const state = props => {
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
  }),
});

export default connect(state, actions)(Home);
