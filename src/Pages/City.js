import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

const url = 'http://192.168.1.70:8080/posts';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      pageOfItems: [],
      city: undefined
    };
  }

  setCity() {
    const city = this.props.match.params.city
    switch (city) {
      case "krd":
        this.setState({ city: "Краснодар" });
        break;
      case "sch":
        this.setState({ city: "Сочи" });
        break;
      case "nvr":
        this.setState({ city: "Новороссийск" });
        break;
      default:
        this.setState({ city: undefined });
    }
  }

  loadPage() {
    const city = this.props.match.params.city;
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;

    if (page !== this.state.pager.currentPage) {
      fetch(`${url}/${city}?page=${page}`, { methos: 'GET' })
        .then(response => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        })
    }
  }

  componentDidMount() { // когда компонент будет монтироваться
    this.setCity();
    this.loadPage();
    setInterval(() => this.loadPage(), 3600000);
  };

  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    const city = this.state.city;
    const { pager, pageOfItems } = this.state;
    return (
      <>
        <Container>
        <h2 className="text-center">{city}</h2>
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

export default City;
