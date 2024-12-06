import { Container, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Navigate } from "react-router-dom";
import profileUser from '../images/profile-user.png';
import UserContext from "../UserContext";
import ChangePasswordModal from "../components/Modal";

export default function Profile() {
    const [user, setUser] = useState(UserContext);
    const [modalShow, setModalShow] = useState(false);
    

    const fetchUserDetails = () => {
        fetch("http://localhost:4000/users/details", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            if (data.code === "USER-SUCCESSFULLY-FOUND") {
                setUser({
                    id: data.result._id,
                    firstName: data.result.firstName,
                    middleName: data.result.middleName,
                    lastName: data.result.lastName,
                    email: data.result.email,
                    contactNumber: data.result.contactNumber,
                    age: data.result.age,
                    isAdmin: data.result.isAdmin
                });
                
            } else {
                setUser(null); 
            }
            
        })
       
    };

    useEffect(() => {
        fetchUserDetails();
    }, []); // Empty dependency array means this effect runs once on mount

    if (!user) {
        return <Navigate to="/"/>;
    }

    
      
  
    return (
        
        <Container>
            <Row className="d-flex px-5">
                <Col className="col-4 d-flex flex-column align-items-center">
                        <img src={profileUser} className="w-25"/>
                        <h4>{user.firstName} {user.lastName}</h4>
                </Col>
                <Col className="col-8 d-flex flex-column align-items-center">
                        <h2 className="text-center">Profile Details</h2>
                        <Row className="w-75">
                            <Col className="col-5 text-end pe-5">Name:</Col>
                            <Col className="col-7">{user.firstName} {user.middleName} {user.lastName}</Col>
                        </Row>
                        <Row className="w-75">
                            <Col className="col-5 text-end pe-5">Email:</Col>
                            <Col className="col-7">{user.email}</Col>
                        </Row>
                        <Row className="w-75">
                            <Col className="col-5 text-end pe-5">Contact Number:</Col>
                            <Col className="col-7">{user.contactNumber} </Col>
                        </Row>
                        <Row className="w-75">
                            <Col className="col-5 text-end pe-5">Age:</Col>
                            <Col className="col-7">{user.age} </Col>
                        </Row>
                        <Button onClick={() => setModalShow(true)}>Change Password</Button>
                        <ChangePasswordModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            userId={user.id}
                        />
                </Col>
            </Row>
        </Container>
       
    );
}