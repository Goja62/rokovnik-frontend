import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import '../../index.css';
import KorisnikType from '../../types/KorisnikType';

interface HomePageState {
    isKorisnikLoggedIn: boolean;
    korisnici: KorisnikType[]
}

interface ApiKorisnikDto {
    korisnikId: number;
    prezime: string;
    ime: string;
}

export default class HomePage extends React.Component {
    state: HomePageState;

    constructor(props: any) {
        super(props)

        this.state = {
            isKorisnikLoggedIn: true,
            korisnici: [],
        }
    }

    componentDidMount() {
        this.getKorisnici()
    }

    componentDidUpdate() {
        this.getKorisnici()
    }
    
    private getKorisnici() {
        api('api/korisnik', 'get', {})
        .then((res: ApiResponse) => {
            if (res.status === "error" || res.status === "login") {
                this.setLoggInState(false)
                return;
            }

            this.putKorisniciInState(res.data)
        })
    }

    private putKorisniciInState(data: ApiKorisnikDto[]) {
        const korisnici: KorisnikType[] | undefined= data.map(korisnik => {
            return {
                korisnikId: korisnik.korisnikId,
                prezime: korisnik.prezime,
                ime :korisnik.ime,
            }
        })
        const newState = Object.assign(this.state, {
            korisnici: korisnici,
        });

        this.setState(newState);
    }

    private setLoggInState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isKorisnikLoggedIn: isLoggedIn,
        })

        this.setState(newState)
    } 
    
    render() {
        if (this.state.isKorisnikLoggedIn === false) {
            return(
                <Redirect to = '/login/korisnik/'></Redirect>
            )
        }
        return (
            <Container>
                <Card className = "homePage">
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon = { faListUl }></FontAwesomeIcon> Svi korisnici
                        </Card.Title>
                            <Row>
                                { this.state.korisnici.map(this.jedanKorisnik) }
                            </Row>
                    </Card.Body>
                </Card>
            </Container>  
        );
    }

    private jedanKorisnik(korisnik: KorisnikType) {
        return (
            <Col lg = "3" md = "3" sm = "6"  xs = "12">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            { korisnik.prezime + ' ' + korisnik.ime }
                        </Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Link 
                            to = {`/korisnik/${ korisnik.korisnikId }` }
                            className = "btn btn-primary w-100">
                            Detalji korisnika
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

