import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    return (
        <Col md={3} className="p-0">
            <div className="sidebar">
                {props.children}
            </div>
        </Col>
    );
};

Sidebar.Item = (props) => {
    return (
        <Card className="sidebar-item">
            <Card.Body>
                {props.title}
            </Card.Body>
        </Card>
    );
};

Sidebar.Brand = (props) => {
    return (
        <Card className="sidebar-brand" style={{ borderRadius: 0 }}>
            <Card.Body>
                <div className="logo-container">
                    <Link to="/home">
                        <img src={props.logo} alt="acb-logo" />
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Sidebar;