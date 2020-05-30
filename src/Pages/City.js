import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';

const url = 'http://192.168.1.70:8080/posts';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      city: undefined
    };
  }

  setCity() {
    const city = this.props.match.params.city
    switch (city) {
      case "krd":
        this.setState({ city: "Краснодар" })
        break;
      case "sch":
        this.setState({ city: "Сочи" })
        break;
      case "nvr":
        this.setState({ city: "Новороссийск" })
        break;
      default:
        this.setState({ city: undefined })
    }
  }

  fetchPosts() {
    const city = this.props.match.params.city
    axios.get(`${url}/${city}`)
      .then(({ data }) => {
        this.setState({
          posts: data
        })
        console.log(data)
      })
      .catch(e => console.log(e));
  }

  componentDidMount() { // когда компонент будет монтироваться
    this.setCity();
    this.fetchPosts();
    setInterval(() => this.fetchPosts(), 3600000)
  };

  render() {
    const posts = this.state.posts
    const rPosts = posts.reverse()
    const city = this.state.city
    return (
      <>
        <h2 className="text-center">{city}</h2>
        <Container>
          <Row>
            {
              rPosts.length ? (
                rPosts.map((post, key) => (
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

export default City;
