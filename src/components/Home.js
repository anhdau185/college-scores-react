import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import Header from './Header';
import Sidebar from './Sidebar';
import ContentPanel from './ContentPanel';

const Home = () => {
    return (
        <Router>
            <div className="page">
                <Header />
                <div className="main">
                    <Container fluid>
                        <Row>
                            <Sidebar>
                                <Sidebar.Item title="Tra cứu trường" />
                                <Sidebar.Item title="Tra cứu ngành" />
                                <Sidebar.Item title="Tra cứu điểm" />
                                <Sidebar.Item title="Dự đoán" />
                                <Sidebar.Item title="Thống kê" />
                            </Sidebar>

                            <ContentPanel>
                                {/* <Route exact path="/home" component={Welcome} /> */}
                                {/* <Route path="/home/help" component={Help} /> */}
                            </ContentPanel>
                        </Row>
                    </Container>
                </div>
            </div>
        </Router>
    );
};

export default Home;