import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  const token = localStorage.getItem("token"); 
  console.log("TOKEMN",token)
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Get the user's token from local storage
      if (!token) {
        // Handle the case where the user is not authenticated
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/user/getLoggedin", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("DATAAAA",data)
      setUserData({
        userName: data.name,
        email: data.email,
        password: data.password,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>UserName</label>
                          <Form.Control
                            defaultValue={userData.userName}
                            placeholder="UserName"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label> Email address</label>
                          <Form.Control
                            defaultValue={userData.email}
                            placeholder="Email"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">Password</label>
                          <Form.Control
                           defaultValue={userData.email}
                            placeholder="Password"
                            type="password"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Update Profile
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
