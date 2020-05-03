import React from 'react';
import {  Col, Card, Button } from 'react-bootstrap';

const setText = (text) => (
  text.length > 150 ? text.substr(0, 150) + '...' : text
);

const Post = (props) => {
  return (
    <Col>
      <Card border="secondary" style={{ flex: 1, width: '250px' }}>
        <Card.Img
          variant="top"
          src={props.image}
          height='150px'
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{setText(props.text)}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Читать дальше</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Post;
