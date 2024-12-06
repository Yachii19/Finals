import { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import Swal from "sweetalert2";




export default function AddCourse() {

    const [imageLink, setImageLink] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    function addCourse(e){
        e.preventDefault();

        fetch("http://localhost:4000/courses/", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                imageLink: imageLink,
                name: name,
                description: description,
                price: price
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.code === "COURSE-ADDED"){
                Swal.fire({
                    title: "COURSE ADDED",
                    text: data.message,
                    icon: "success"
                })
                setImageLink("");
                setName("");
                setDescription("");
                setPrice("");
            }
        })
    }

    return(
        <Container  className="vh-100 p-5">
            <Container className=" mb-5">
                <h1 className="display-3 fw-bold">ADD NEW COURSE</h1>
            </Container>

            <Container className="d-flex flex-column">
                <Form className="w-100 p-5 shadow rounded-3 border-bottom border-3 border-warning " onSubmit={(e) => addCourse(e)}>

                    <Image src={imageLink} className={`img-fluid center-crop mb-3 ${imageLink === "" ? "d-none" : ""}`}></Image>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Image Link" required value={imageLink} onChange={e => setImageLink(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Course Name" required value={name} onChange={e => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Course Description" required value={description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="number" placeholder="Price" required value={price} onChange={e => setPrice(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Button variant="warning" className="w-100 rounded-pill" type="submit">Login</Button>
                    </Form.Group>

                </Form>
            </Container>
        </Container>
    )
}