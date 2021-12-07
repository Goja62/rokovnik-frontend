import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container } from 'react-bootstrap';
import '../../index.css';

function HomePage() {
  return (
    <Container>
      <Card className = "homePage">
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

export default HomePage;
