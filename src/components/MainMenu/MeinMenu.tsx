import React from "react";
import { Card, Container, Nav } from "react-bootstrap";
import { HashRouter, Link } from "react-router-dom";

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

interface MainMenuState {
    items: MainMenuItem[]
}

export default class MainMenu extends React.Component<MainMenuProporties> {
    state: MainMenuState;
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
                    <HashRouter>
                        <Nav variant = "tabs">
                            { this.state.items.map(this.makeNavLink) }
                        </Nav>
                    </HashRouter>
                </Card>
            </Container>
        )
    }

    private makeNavLink(item: MainMenuItem) {
        return (
            <Link to = { item.link } className = "nav-link">{ item.text }</Link>
        )
    }   
}