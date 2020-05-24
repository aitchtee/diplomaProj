import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Container, Row } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

import Spinner from '../components/Spinner';

const url = 'http://192.168.1.70:8080/posts';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    }
    this.goBack = this.goBack.bind(this); 
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    let id = this.props.match.params.post_id;
    let city = this.props.match.params.city;
    axios.get(`${url}/${city}/${id}`)
      .then(res => {
        this.setState({
          post: res.data
        });
        console.log(res);
      });
  };

  render() {
    const post = this.state.post ? (
      <div >
        <Card style={{ width: '100%' }}>
          <Card.Body style={{ backgroundColor: 'aliceblue' }}>
            <Card.Header>
              <h4>Источник: {this.state.post.source}</h4>
              <div className='post__header'>{this.state.post.tag}</div>
            </Card.Header>
            <Card.Img variant="top" src={this.state.post.image} style={{ width: "50%", marginTop: "10px", marginBottom: "40px" }} />
            <Card.Title style={{ color: 'red', fontSize: '30px', marginBottom: '30px', }}>{this.state.post.title}</Card.Title>
            <Card.Text style={{ fontSize: "20px", }}>
              {this.state.post.text}
            </Card.Text>
            <Card.Footer>
              <Button icon labelPosition='left' onClick={this.goBack}>
                <Icon name='angle double left' />
                К новостям
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    ) : (
        <Spinner />
      )

    return (
      <Container>
        <Row>
          {post}
        </Row>
      </Container>

    );
  }
};

export default PostDetails;