import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

const url = 'http://192.168.1.70:8080/posts';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      pageOfItems: [],
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

  loadPage() {
    const city = this.props.match.params.city;
    const tag = this.props.match.params.tag;
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;

    if (page !== this.state.pager.currentPage) {
      fetch(`${url}/${city}/${tag}?page=${page}`, { methos: 'GET' })
        .then(response => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        })
    }
  }

  componentDidMount() { // когда компонент будет монтироваться
    this.setCity();
    this.loadPage();
    setInterval(() => this.loadPage(), 3600000)
  };

  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    const city = this.state.city;
    const tag = this.state.tag;
    const { pager, pageOfItems } = this.state;
    return (
      <>
        <Container>
          <h2 className="text-center">{city} : {tag}</h2>
          <Row>
            {
              pageOfItems.length ? (
                pageOfItems.map((post, key) => (
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
          <Pagination {...pager} />
        </Container>
      </>
    )
  }
};

export default Tag;
