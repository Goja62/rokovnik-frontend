import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Container } from "react-bootstrap";
import KontaktType from "../../types/KontaktType";

interface KontaktPageProporties {
    match: {
        params: {
            kId: number,
        }
    }
}

interface KontaktPageState {
    kontakt?: KontaktType;
}

export default class KontaktPage extends React.Component<KontaktPageProporties> {
    state: KontaktPageState

    constructor(props: KontaktPageProporties | Readonly<KontaktPageProporties>) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Title>
                        <FontAwesomeIcon icon = {  faUserAstronaut }></FontAwesomeIcon> { this.state.kontakt?.prezime }
                    </Card.Title>
                    <Card.Text>
                        Podaci o kontaktu
                    </Card.Text>
                </Card>
            </Container>
        )
    }

    componentDidMount() {
       this.getKontaktData()
    }

    componentDidUpdate(oldProperties: KontaktPageProporties) {
        if ( oldProperties.match.params.kId === this.props.match.params.kId) {
            return;
        }
        
        this.getKontaktData()
    }

    private getKontaktData() {
        setTimeout(() => {
            const data: KontaktType = {
             prezime: 'Kontakt id: ' +  this.props.match.params.kId,
             kontaktId: this.props.match.params.kId
            };
 
            this.setState({
             kontakt: data,
            })
         }, 500)
    }

}