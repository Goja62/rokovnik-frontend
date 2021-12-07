import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Container } from "react-bootstrap";

export default class KorisnikPage extends React.Component {
    render() {
        return(
            <Container>
                <Card>
                    <Card.Title>
                        <FontAwesomeIcon icon = { faUserAlt }></FontAwesomeIcon> Korisnik
                    </Card.Title>
                    <Card.Body>
                        <Card.Text>
                            Podaci o korisniku
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}