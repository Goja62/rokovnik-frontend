import React from "react";
import { Card, Container, Nav } from "react-bootstrap";

export class MainMenuItem {
    text: string = '';
    link: string = '#';

    constructor(text: string = '', link: string = '#') {
        this.text = text;
        this.link = link
    }
} 

interface MainMenuProporties {
    items: MainMenuItem[]
}

interface MainManuState {
    items: MainMenuItem[]
}

export default class MainMenu extends React.Component<MainMenuProporties> {
    state: MainManuState;
    constructor(props: MainMenuProporties | Readonly<MainMenuProporties> ) {
        super(props)

        this.state = {
            items: props.items,
        }
    }

    setItems(items: MainMenuItem[]) {
        this.setState({
            items: items,
        })
    }
    
    render() {
        return(
            <Container >
                <Card className = "home">
                    <Nav variant = "tabs">
                        { this.state.items.map(this.makeNavLink) }
                    </Nav>
                </Card>
            </Container>
        )
    }

    private makeNavLink(item: MainMenuItem) {
        return (
            <Nav.Link href = { item.link }>{ item.text }</Nav.Link>
        )
    }   
}