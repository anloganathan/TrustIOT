import React from "react";

import '../styles/Home.css';
import { Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Home = (props) => {

  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="jumbotron">Welcome!</h1>
      <div className="home-card-container">
        <Card border="info" style={{ width: '18rem' }}
          onClick={() => { navigate("/devices") }}>
          <Card.Header>Devices</Card.Header>
          <Card.Body>
            <Card.Title>Device Details</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card border="info" style={{ width: '18rem' }}
          onClick={() => { navigate("/patients") }}>
          <Card.Header>Patients</Card.Header>
          <Card.Body>
            <Card.Title>Patient Readings</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Home;