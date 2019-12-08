import React from 'react';
import DateView from './DateView';
import { Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import { logOutAction } from '../actions'

const Header = () => {
    return;
};

const mapStateToProps = state => ({ loggedIn: state.loggedIn });
const mapDispatchToProps = dispatch => ({ handleLogout: () => dispatch(logOutAction) });
const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;