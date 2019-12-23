import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageBox = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                Dữ liệu đầu vào chưa đủ hoặc không hợp lệ
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
