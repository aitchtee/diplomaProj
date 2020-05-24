import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const setText = (text) => (
  text.length > 150 ? text.substr(0, 150) + '...' : text
);

const Post = (props) => {
  return (
    <Col key={props._id}>
      <Card className="mb-3" border="secondary" style={{ flex: 1, width: '18rem' }}>
        <Card.Img
          variant="top"
          src={props.image}
          height='150px'
        />
        <Card.Body>
          <Card.Title>
            <Link to={'/' + props.city + '/' + props._id}>{props.title}</Link>
          </Card.Title>
          <Card.Text>{setText(props.text)}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" href={'/' + props.city + '/' + props._id}>Читать дальше</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Post;
