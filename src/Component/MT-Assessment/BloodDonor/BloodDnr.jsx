import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import DonorServ from "../Service/DonorServ";
import axios from "axios";

const BloodDnr = () => {
  const navigate = useNavigate();
  const [dnrId, setdnrId] = useState("");
  const [dnrName, setdnrName] = useState("");
  const [dnrAge, setdnrAge] = useState("");
  const [dnrWeight, setdnrWeight] = useState("");
  const [dnrMob, setdnrMob] = useState("");
  const [dnrLocation, setdnrLocation] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [Adata, setAdata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location = "/Donor";
  };
  const handleShow = (Id, name, age, weight, mob, location) => {
    setShow(true);
    setdnrId(Id);
    setdnrName(name);
    setdnrAge(age);
    setdnrWeight(weight);
    setdnrMob(mob);
    setdnrLocation(location);
  };

  useEffect(() => {
    axios.get("http://localhost:2024/donor/findAllDonor").then((response) => {
      setAdata(response.data);
    });
  }, []);

  const moveInsert = () => {
    navigate("/DonorInsert");
  };

  const updateFormData = () => {
    const indata = { dnrId, dnrName, dnrAge, dnrWeight, dnrMob, dnrLocation };
    DonorServ.doUpdate(indata)
      .then(() => {})
      .catch(() => {
        alert("Updation Failure");
      });
  };

  const deleteBank = (data) => {
    DonorServ.doDelete(data).catch(() => {
      alert("Deletion failure");
    });
    window.location = "/Donor";
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={moveInsert}
        name="addDonorBtn"
        style={{ marginLeft: "130px", marginTop: "30px" }}
      >
        Add Donor
      </Button>
      <Card bg="light" id="findall">
        <Card.Header id="fheader">
          <h2>Record</h2>
        </Card.Header>
        <Card.Body>
          <Table
            className="table table-hover"
            responsive="md"
            data-testid="donorTable"
          >
            <thead>
              <tr>
                <th scope="col">Donor ID</th>
                <th scope="col">Donor Name</th>
                <th scope="col">Donor Age</th>
                <th scope="col">Donor Weight</th>
                <th scope="col">Mobile</th>
                <th scope="col">Location</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Adata.map((data, index) => (
                <tr key={index} data-testid="donorData">
                  <td>{data.dnrId}</td>
                  <td>{data.dnrName}</td>
                  <td>{data.dnrAge}</td>
                  <td>{data.dnrWeight}</td>
                  <td>{data.dnrMob}</td>
                  <td>{data.dnrLocation}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() =>
                        handleShow(
                          data.dnrId,
                          data.dnrName,
                          data.dnrAge,
                          data.dnrWeight,
                          data.dnrMob,
                          data.dnrLocation
                        )
                      }
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      name={data.dnrId}
                      onClick={() => deleteBank(data.dnrId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(updateFormData)}>
          <Modal.Header closeButton id="header">
            <Modal.Title>Updation Operation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                value={dnrId}
                placeholder="Donor Id"
              />
              <label htmlFor="floatingPasswordCustom">Donor Id</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                defaultValue={dnrName}
                onChange={(e) => {
                  setdnrName(e.target.value);
                }}
                placeholder="Donor Name"
              />
              <label htmlFor="floatingPasswordCustom">Donor Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="Donor AGe"
                onChange={(e) => {
                  setdnrAge(e.target.value);
                }}
                defaultValue={dnrAge}
              />
              <label htmlFor="floatingPasswordCustom">Donor Age</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                onChange={(e) => setdnrWeight(e.target.value)}
                defaultValue={dnrWeight}
                placeholder="Donor Weight "
              />
              <label htmlFor="floatingPasswordCustom">Donor Weight</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                defaultValue={dnrMob}
                onChange={(e) => setdnrMob(e.target.value)}
                placeholder="Mobile"
              />
              <label htmlFor="floatingPasswordCustom">Mobile</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                defaultValue={dnrLocation}
                onChange={(e) => setdnrLocation(e.target.value)}
                placeholder="Location"
              />
              <label htmlFor="floatingPasswordCustom">Location</label>
            </Form.Floating>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              style={{ margin: "10px" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="success"
              onClick={handleClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default BloodDnr;
