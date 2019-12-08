import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const Home = () => {
    return;
};

const mapStateToProps = state => ({ loggedIn: state.loggedIn });
const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;