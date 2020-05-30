import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://192.168.1.70:8080/posts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  fetchPosts() { // получение данных из таблицы
    axios.get(`${url}`)
      .then(({ data }) => {
        this.setState({
          posts: data
        })
      })
      .catch(e => console.log(e));
  }

  componentDidMount() { // когда компонент будет монтироваться
    this.fetchPosts();
    setInterval(() => this.fetchPosts(), 3600000)
  };

  render() {
    const posts = this.state.posts
    const rPosts = posts.reverse()
    return (
      <>
        <h2 className="text-center">Все новости</h2>
        <Container>
          <Row>
            {
              rPosts.length ? (
                rPosts.map((item, key) => (
                  <Post
                    key={key}
                    {...item} // все свойства из item будут переданы компоненту
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

export default Home;
