import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Header from './Header';

const Home = () => {
    return (
        <div>
            <Header />
        </div>
    );
};

export default Home;