import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';

const url = 'http://192.168.1.70:8080/posts';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      city: undefined,
      tag: undefined
    };
  }

  setCity() {
    const city = this.props.match.params.city
    const tag = this.props.match.params.tag
    switch (city) {
      case "krd":
        switch (tag) {
          case "Власть":
            this.setState({ city: "Краснодар", tag: "Власть" })
            break;
          case "Общество":
            this.setState({ city: "Краснодар", tag: "Общество" })
            break;
          case "Происшествия":
            this.setState({ city: "Краснодар", tag: "Происшествия" })
            break;
          case "Экономика":
            this.setState({ city: "Краснодар", tag: "Экономика" })
            break;
          default:
            this.setState({ city: "Краснодар", tag: undefined })
        }
        break;
      case "sch":
        switch (tag) {
          case "Здравоохранение":
            this.setState({ city: "Сочи", tag: "Здравоохранение" })
            break;
          case "Общество":
            this.setState({ city: "Сочи", tag: "Общество" })
            break;
          case "Происшествия":
            this.setState({ city: "Сочи", tag: "Происшествия" })
            break;
          case "Комунальные услуги":
            this.setState({ city: "Сочи", tag: "Комунальные услуги" })
            break;
          default:
            this.setState({ city: "Сочи", tag: undefined })
        }
        break;
      case "nvr":
        switch (tag) {
          case "ЖКХ":
            this.setState({ city: "Новороссийск", tag: "ЖКХ" })
            break;
          case "Городская среда":
            this.setState({ city: "Новороссийск", tag: "Городская среда" })
            break;
          case "Происшествия":
            this.setState({ city: "Новороссийск", tag: "Происшествия" })
            break;
          case "История":
            this.setState({ city: "Новороссийск", tag: "История" })
            break;
          default:
            this.setState({ city: "Новороссийск", tag: undefined })
        }
        break;
      default:
        this.setState({ city: undefined, tag: undefined })
    }
  }

  fetchPosts() {
    const city = this.props.match.params.city
    const tag = this.props.match.params.tag
    axios.get(`${url}/${city}/${tag}`)
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
    const posts = this.state.posts;
    const city = this.state.city;
    const tag = this.state.tag;
    const rPosts = posts.reverse()
    return (
      <>
        <h2 className="text-center">{city} : {tag}</h2>
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

export default Tag;
