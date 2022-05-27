import React, { useRef, useState, FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";

const Home: FC = () => {
  return (
    <div className="home-my-container">
      <div>
        <p className="home-top-header">
          Discover 3D shapes <br /> with us
        </p>
      </div>
      <Row className="home-row-container">
        <Col className="col-container">
          <div className="tab">
            <p className="header">Learning</p>
            <p className="text">
              This service is designed to study the figures of stereometry. In
              the learning section you will be able to explore the appearance of
              the selected figure in a three-dimensional plane. It is also
              possible to control the parameters of the figure
            </p>
          </div>
        </Col>
        <Col>
          <div className="tab">
            <p className="header">Drawing</p>
            <p className="text">
              With the help of this service you can also build the figure you
              need. In the construction section, you can add sections to the
              shape and add lines of intersection, points, vertices, etc.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="home-row-container">
        <Col className="col-container">
          <div className="home-tab">
            <p className="header">Galery</p>
            <p className="text">
              The service provides the user with a gallery page where you can
              view the shapes created by other users. Also, when registering,
              you have the opportunity to add your own figure to the gallery
            </p>
          </div>
        </Col>
        <Col>
          <div className="home-tab">
            <p className="header">Goal</p>
            <p className="text">
              The purpose of this web service is to develop the spatial
              imagination of users. Also the possibility of using this web
              service in the process of learning and research
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
