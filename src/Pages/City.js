import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';

const url = 'http://192.168.1.70:8080/posts';

class Krasnodar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const city = this.props.match.params.city
    axios.get(`${url}/${city}`).then(posts => {
      this.setState({
        posts: posts.data
      })
    })
  }

  render() {
    const posts = this.state.posts
    return (
      <>
        <Container>
          <Row>
            {
              posts.length ? (
                posts.map((post, key) => (
                  <Post
                    key={key}
                    {...post}
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
};

export default Krasnodar;
