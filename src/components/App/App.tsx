import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from './logo.svg';

function App() {
  return (
    <Container className = "home">
      <Card >
        <Card.Title>
          <FontAwesomeIcon icon = { faHome }></FontAwesomeIcon> Home
        </Card.Title>
        <Card.Body>
          <Card.Text>
            Neki tekst
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
