import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logInAction } from '../actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePwdChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        if (this.authenticateUser()) {
            this.setState({ loggedIn: true });
        } else {
            console.log(
                '%c [error] Unsuccessful login',
                'color: orange; font-weight: bold;'
            );
        }

        event.preventDefault();
    }

    authenticateUser() {
        return this.state.username === 'user' && this.state.password === 'user';
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/home' />;
        }

        return (
            <Container className="py-5">
                <Row>
                    <Col md={3} />
                    <Col md={6}>
                        <h2 className="mb-4">Welcome to ACB Online</h2>

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    onChange={this.handleNameChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handlePwdChange}
                                />
                            </Form.Group>

                            <Button variant="success" type="submit">Log in</Button>
                        </Form>
                    </Col>
                    <Col md={3} />
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });
const mapDispatchToProps = dispatch => ({ handleLoginSuccess: () => dispatch(logInAction) });
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;