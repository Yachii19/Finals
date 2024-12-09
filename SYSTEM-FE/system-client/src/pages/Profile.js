import { Container, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import sampleProfile from "../images/sample-profile.avif";
import UserContext from "../UserContext";
import ChangePasswordModal from "../components/Modal";

export default function Profile() {
  const [user, setUser] = useState(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [theme, setTheme] = useState("light"); 

  const fetchUserDetails = () => {
    fetch("http://localhost:4000/users/details", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.code === "USER-SUCCESSFULLY-FOUND") {
          setUser({
            id: data.result._id,
            firstName: data.result.firstName,
            middleName: data.result.middleName,
            lastName: data.result.lastName,
            email: data.result.email,
            contactNumber: data.result.contactNumber,
            age: data.result.age,
            isAdmin: data.result.isAdmin,
          });
        } else {
          setUser(null);
        }
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <Container fluid className={`profile-container ${theme}-theme`}>
      <Row className="d-flex justify-content-center align-items-center profile-card">
        <Col md={4} className="profile-picture text-center">
          <img src={sampleProfile} className="rounded-circle profile-img" />
          <h4>{user.firstName} {user.lastName}</h4>
        </Col>
        <Col md={8} className="profile-details">
          <h2 className="text-center">Profile Details</h2>
          <Row className="profile-detail">
            <Col className="text-end detail-label">Name:</Col>
            <Col className="detail-value">{user.firstName} {user.lastName}</Col>
          </Row>
          <Row className="profile-detail">
            <Col className="text-end detail-label">Email:</Col>
            <Col className="detail-value">{user.email}</Col>
          </Row>
          <Row className="profile-detail">
            <Col className="text-end detail-label">Contact Number:</Col>
            <Col className="detail-value">{user.contactNumber}</Col>
          </Row>
          <Row className="profile-detail">
            <Col className="text-end detail-label">Age:</Col>
            <Col className="detail-value">{user.age}</Col>
          </Row>
          <div className="text-center mt-4 button-container">
            <Button onClick={() => setModalShow(true)} className="custom-button">
              Change Password
            </Button>
            <Button onClick={toggleTheme} className="custom-button  ">
              {theme === "dark" ? "Light" : "Dark"} Theme
            </Button>
            <ChangePasswordModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              userId={user.id}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
