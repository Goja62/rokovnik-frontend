import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import api, { ApiResponse } from "../../api/api";
import { Funkcije } from "../../misc/funkcije";
const funkcija = new Funkcije()

interface KorisnikRegistrattionPageState {
    formData: {
        email: string;
        password: string;
        prezime: string;
        ime: string;
        telefon: string;
        adresa: string;
    }
    message?: string;
    isRegistrationComplete: boolean;
}

export class KorisnikRegistrationPage extends React.Component {
    state: KorisnikRegistrattionPageState;
    constructor(props: any) {
        super(props)

        this.state = {
            isRegistrationComplete: false,
            formData: {
                email: '',
                password: '',
                prezime: '',
                ime: '',
                telefon: '',
                adresa: '',
            },
        }
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newFormData = Object.assign(this.state.formData, {
            [ event.target.id ]: event.target.value,
        });

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });

        this.setState(newState);
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        })

        this.setState(newState)
    }
    
    render() {
        return (
            <Container>
                <Col md = { { span: 6, offset: 3 } } >
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon = { faUserPlus }></FontAwesomeIcon> Korisnik Login
                            </Card.Title>
                            {
                                (this.state.isRegistrationComplete === false) ? this.renderForm() : this.renderRegistrationCompleteMesage()
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        )
    }

    public renderRegistrationCompleteMesage () {
        return(
            <p>
                Nalog je registrovan <br />
                <Link to = '/login/korisnik/'>Kliknite ovde </Link>da bi ste se prijavili.
            </p>
        )
    }

    public renderForm() {
        return(
        <>
            <Form>
                <Row className = "mt-3">
                    <Col md = "6">
                        <Form.Group>
                            <Form.Label 
                                htmlFor = "email"> E-mail
                            </Form.Label>
                            <Form.Control 
                                type = "email"
                                id = "email"
                                value = { this.state.formData?.email }
                                onChange = { e => this.formInputChanged(e as any) }>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md = "6">
                        <Form.Group>
                            <Form.Label 
                                htmlFor = "password"> Password
                            </Form.Label>
                            <Form.Control 
                                type = "password"
                                id = "password"
                                value = { this.state.formData?.password }
                                onChange = { e => this.formInputChanged(e as any) }>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className = "mt-3">
                    <Col md = "6">
                        <Form.Group>
                            <Form.Label 
                                htmlFor = "prezime"> Prezime
                            </Form.Label>
                            <Form.Control 
                                type = "text"
                                id = "prezime"
                                value = { this.state.formData?.prezime }
                                onChange = { e => this.formInputChanged(e as any) }>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md = "6">
                        <Form.Group>
                            <Form.Label 
                                htmlFor = "ime"> Ime
                            </Form.Label>
                            <Form.Control 
                                type = "text"
                                id = "ime"
                                value = { this.state.formData?.ime }
                                onChange = { e => this.formInputChanged(e as any) }>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label 
                        htmlFor = "telefon"> Telefon
                    </Form.Label>
                    <Form.Control 
                        type = "text"
                        id = "telefon"
                        value = { this.state.formData?.telefon }
                        onChange = { e => this.formInputChanged(e as any) }>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label 
                        htmlFor = "adresa"> Adresa
                    </Form.Label>
                    <Form.Control 
                        as = "textarea"
                        rows = { 4 }
                        id = "adresa"
                        value = { this.state.formData?.adresa }
                        onChange = { e => this.formInputChanged(e as any) }>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Button 
                        variant = "primary"
                        className = "mt-3"
                        onClick = { () => this.doRegister() }
                        > Login
                    </Button>
                </Form.Group>
            </Form>

            <Alert variant = "danger" 
                className={ this.state.message ? '' : 'd-none' }>
                { this.state.message }
            </Alert>
        </>
        )
    }

    private doRegister() {
        const data = {
            email: this.state.formData?.email,
            password: this.state.formData?.password,
            prezime: this.state.formData?.prezime,
            ime: this.state.formData?.ime,
            telefon: this.state.formData?.telefon,
            adresa: this.state.formData?.adresa,
        };

        api('auth/register/korisnik/', 'post', data)
        .then((res: ApiResponse) => {
            console.log(res)
            if (res.status === 'error') {
                return this.setErrorMessage('Sistemska greška ... Probajte ponovo!')
            }

            if (res.data.statusCode !== undefined) {
                this.handleErrors(res.data) ;
                return
            }

            this.registrationComplete()
        })
    }

    private handleErrors(data: any) {
        let message = ''

        switch (data.statusCode) {
            case -8001: message = 'Ovaj nalog već postoji'; break;
        }

        this.setErrorMessage(message)
    }

    private registrationComplete() {
        const newState = Object.assign(this.state, {
            isRegistrationComplete: true
        })

        this.setState(newState)
    }
}