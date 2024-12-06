import { useState } from "react";
import { Card, Button, Col } from "react-bootstrap";


export default function CourseCard({coursesData}) {
    
    const {_id, imageLink, name, description, price} = coursesData;
   
    return(
        <Col lg={3} sm={12}>
        <Card className="w-100 p-2 mx-2 my-2 shadow col-lg-3 col-12 card-heigth">
            <Card.Img variant="top" src={imageLink}  className="center-crop"/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Subtitle>Price</Card.Subtitle>
                <Card.Text>
                    {price}
                </Card.Text>
                <Card.Text>
                
                </Card.Text>

                <Card.Footer>
                    <Button variant="primary" className="vertical-align w-100 rounded-pill">Enroll</Button>
                </Card.Footer>
                
            </Card.Body>
        </Card>
        </Col>
        
    )
}