import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import Post from '../components/Post';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://192.168.1.70:8080/posts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      pageOfItems: []
    }
  }

  loadPage() {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;

    if (page !== this.state.pager.currentPage) {
      fetch(`${url}?page=${page}`, { methos: 'GET' })
        .then(response => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        })
    }
  }

  componentDidMount() { // когда компонент будет монтироваться
    this.loadPage();
    setInterval(() => this.loadPage(), 3600000);
  };

  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    const { pager, pageOfItems } = this.state;
    return (
      <>
        <Container>
          <h2 className="text-center">Все новости</h2>
          <Row>
            {
              pageOfItems.length ? (
                pageOfItems.map((item, key) => (
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
          <Pagination {...pager} />
        </Container>
      </>
    )
  }
}

export default Home;
