import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
    return (
        <Col md={3} className="p-0">
            <div className="sidebar">
                {children}
            </div>
        </Col>
    );
};

Sidebar.Item = ({ title, link }) => {
    return (
        <Card className="sidebar-item">
            <Card.Body>
                <Link to={link}>
                    {title}
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Sidebar;
