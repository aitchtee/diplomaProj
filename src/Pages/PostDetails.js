import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

import Spinner from '../components/Spinner'

class PostDetails extends Component {
  state = {
    post: null
  }

  componentDidMount() {
    let id = this.props.match.params.post_id;
    axios.get('http://localhost:8080/posts/' + id)
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
          <Card.Body>
            <Card.Title style={{ color: 'red', fontSize: '30px', }}>{this.state.post.title}</Card.Title>
            <Card.Img variant="top" src={this.state.post.image} style={{ width: "50%", marginTop: "30px", marginBottom: "40px" }} />
            <Card.Text style={{ fontSize: "15px" }}>
              {this.state.post.text}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ) : (
        <Spinner />
      )

    return (
      <div className="container">
        {post}
      </div>
    );
  }
};

export default PostDetails;