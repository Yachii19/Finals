import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ChangePasswordModal({ show, onHide, userId }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handlePasswordChange = (e) => {
        e.preventDefault();
        
        // Password validation
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Send PUT request to update password
        fetch(`http://localhost:4000/users/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ newPassword })
        })
        .then((result) => result.json())
        .then((data) => {
            if (data.code === "USER-PASSWORD-SUCCESSFULLY-UPDATED") {
                Swal.fire({
                    title: "SUCCESSFULLY UPDATED PASSWORD",
                    text: "You have successfully updated your password",
                    icon: "success"
                })
                setNewPassword("");
                setConfirmPassword("");
                setError("");
                onHide(); 
            } else if(data.message === "New password is required.") {
                Swal.fire({
                    title: "USER-NOT-FOUND",
                    text: "Cannot find the user to update the password",
                    icon: "error"
                })
            } else {
                setError(data.message || "An error occurred. Please try again.");
            }
        })
        .catch((err) => {   
            console.error(err);
            Swal.fire({
                title: "SOMETHING WENT WRONG!",
                text: "Please try again",
                icon: "error"
            })
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePasswordChange}>
                    <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button variant="primary" type="submit">
                        Update Password
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
