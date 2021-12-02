import React from "react";
import { Card, Container, Nav } from "react-bootstrap";

export default class MainMenu extends React.Component {
    render() {
        return(
            <Container>
                <Card>
                    <Nav variant = "tabs">
                        <Nav.Link href = "home">Home</Nav.Link>
                        <Nav.Link href = "korisnik">Korisnik</Nav.Link>
                        <Nav.Link href = "login">Log in</Nav.Link>
                    </Nav>
                </Card>
            </Container>
        )
    }
}