import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; // используется, когда нужно при экспорте требуется подключить что-то
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://192.168.1.70:8080/posts';

class Home extends Component {

  fetchPosts() {
    const { setPosts } = this.props;
    setPosts([]);
    axios
      .get(`${url}`)
      .then(({ data }) => {
        setPosts(data);
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
        <Container>
          <Row>
            {
              items.length ? ( 
                items.map((item, key) => (
                  <Post
                    key={key}
                    {...item} // все свойства из item будут присвоены компоненту
                  />
                ))
              ) : (
                  <Spinner />
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
