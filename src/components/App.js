import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import Header from './Header';
import Sidebar from './Sidebar';
import ContentPanel from './ContentPanel';

import EntranceScore from './EntranceScore';
// import Predict from './Predict';
// import Stats from './Stats';

const App = () => {
    return (
        <Router>
            <div className="page">
                <Header />
                <div className="main">
                    <Container fluid>
                        <Row>
                            <Sidebar>
                                <Sidebar.Item title="Tra cứu điểm" link="/score" />
                                <Sidebar.Item title="Dự đoán" link="/predict" />
                                <Sidebar.Item title="Thống kê" link="/stats" />
                            </Sidebar>

                            <ContentPanel>
                                <Route exact path="/" component={EntranceScore} />
                                <Route path="/score" component={EntranceScore} />
                                {/* <Route path="/predict" component={Predict} /> */}
                                {/* <Route path="/stats" component={Stats} /> */}
                            </ContentPanel>
                        </Row>
                    </Container>
                </div>
            </div>
        </Router>
    );
}

export default App;
