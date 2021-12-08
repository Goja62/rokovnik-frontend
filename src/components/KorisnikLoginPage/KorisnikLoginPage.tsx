import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Container, Form, Button, Col, Alert} from "react-bootstrap";
import { Redirect } from "react-router";
import api, { ApiResponse, saveRefreshToken, saveToken } from "../../api/api";

interface KorisnikLoginPageState {
    email: string;
    password: string;
    errorMesasage: string;
    isLoggedIn: boolean
}

export default class KorisnikLoginPage extends React.Component {
    state: KorisnikLoginPageState;

    constructor(prpos: any) {
        super(prpos)
        
        this.state = {
            email: '',
            password: '',
            errorMesasage: '',
            isLoggedIn: false,
        }
    }

    private formInputChanged(e: React.ChangeEvent<HTMLInputElement> ) {
        const newState = Object.assign(this.state, {
            [ e.target.id ]:  e.target.value
        })

        this.setState(newState)
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            errorMesasage: message,
        })

        this.setState(newState)
    }

    private setLoggInState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        })

        this.setState(newState)
    } 
    
    private doLogin() {
        api('auth/login/korisnik', 'post', { email: this.state.email, password: this.state.password, })
        .then((res: ApiResponse) => {
            if (res.status === 'error') {
                console.log(res.data);
                return
            }

            if (res.status === 'ok') {
                if (res.data.statusCode !== undefined) {
                    let message = ''
                    switch (res.data.statusCode) {
                        case -4001: message = 'Nepozanta email adresa'; break;
                        case -4002: message = 'Pogrešna lozinka'; break;
                    }
                    this.setErrorMessage(message)
                    return
                }

                saveToken(res.data.token);
                saveRefreshToken(res.data.refreshToken)

                this.setLoggInState(true)
            }
            console.log(res.status)
            

        })
    }
    
    render() {
        if (this.state.isLoggedIn === true) {
            return(
                <Redirect to = '/'></Redirect>
            )
        }
        return(
            <Container>
                <Col md = { { span: 6, offset: 3 } } >
                    <Card>
                        <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon = { faSignInAlt }></FontAwesomeIcon> Korisnik Login
                        </Card.Title>
                        
                            <Form>
                                <Form.Group>
                                    <Form.Label 
                                        htmlFor = "email"> E-mail
                                    </Form.Label>
                                    <Form.Control 
                                        type = "email"
                                        id = "email"
                                        value = { this.state.email }
                                        onChange = { e => this.formInputChanged(e as any) }>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label 
                                        htmlFor = "password"> Password
                                    </Form.Label>
                                    <Form.Control 
                                        type = "password"
                                        id = "password"
                                        value = { this.state.password }
                                        onChange = { e => this.formInputChanged(e as any) }>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Button 
                                        variant = "primary"
                                        className = "mt-3"
                                         onClick = { () => this.doLogin() }
                                        > Login
                                    </Button>
                                </Form.Group>
                            </Form>

                            <Alert variant = "danger" 
                                className={ this.state.errorMesasage ? '' : 'd-none' }>
                                { this.state.errorMesasage }
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        )
    }
}