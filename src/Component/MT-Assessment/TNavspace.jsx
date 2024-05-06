import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoHome } from "react-icons/io5";
import { BsDatabaseAdd } from "react-icons/bs";
import { BsDatabaseFillUp } from "react-icons/bs";
import { BsDatabaseFillX } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
import { Nav, Navbar, Container } from "react-bootstrap";
import THome from "./THome";
import BloodDnr from "./BloodDonor/BloodDnr";
import BloodDnrInsert from "./BloodDonor/BloodDnrInsert";
import BloodStk from "./BloodStock/BloodStk";
import BloodStkInsert from "./BloodStock/BloodStkInsert";
import Cust from "./Customer/Cust";

const TNavspace = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar
          expand="lg"
          className="bg-body-tertiry"
          bg="dark"
          variant="dark"
          sticky="top"
        >
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://as2.ftcdn.net/v2/jpg/05/59/73/69/1000_F_559736920_crlhU44gd3bWBhN485Sr44ahx9LU3oL1.jpg"
                width="100"
                height="70"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              id="nav-toggle-button"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  <div className="box">
                    <b className="icon">
                      <IoHome />
                      Home
                    </b>
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/Stock">
                  <div className="box">
                    <b className="icon">BloodStock</b>
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/Donor">
                  <div className="box">
                    <b className="icon">BloodDonor</b>
                  </div>
                </Nav.Link>

                <Nav.Link as={Link} to="/User">
                  <div className="box">
                    <b className="icon">User</b>
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<THome />} />
          <Route path="/Donor" element={<BloodDnr />} />
          <Route path="/DonorInsert" element={<BloodDnrInsert />} />
          <Route path="/Stock" element={<BloodStk />} />
          <Route path="/StockInsert" element={<BloodStkInsert />} />
          <Route path="/User" element={<Cust />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default TNavspace;
