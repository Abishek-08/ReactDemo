import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import DonorServ from "../Service/DonorServ";
import StockServ from "../Service/StockServ";

const BloodStk = () => {
  const navigate = useNavigate();
  const [dnrId, setdnrId] = useState("");
  const [blId, setblId] = useState("");
  const [blGroup, setblGroup] = useState("");
  const [blCount, setblCount] = useState("");
  const [blRBC, setblRBC] = useState("");
  const [blWBC, setblWBC] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [Adata, setAdata] = useState([]);
  const [Bdata, setBdata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location = "/Stock";
  };
  const handleShow = (BId, BGrp, BCont, BRbc, BWbc, DId) => {
    setShow(true);
    setdnrId(DId);
    setblId(BId);
    setblGroup(BGrp);
    setblCount(BCont);
    setblRBC(BRbc);
    setblWBC(BWbc);
  };

  useEffect(() => {
    DonorServ.doFindAll().then((response) => {
      setBdata(response.data);
    });
  }, []);

  useEffect(() => {
    StockServ.doFindAll().then((response) => {
      setAdata(response.data);
    });
  }, [show]);

  const moveInsert = () => {
    navigate("/StockInsert");
  };

  const updateFormData = (data) => {
    const inData = {
      blId,
      blGroup,
      blCount,
      blRBC,
      blWBC,
      donor: {
        dnrId,
      },
    };

    StockServ.doUpdate(inData)
      .then(() => {})
      .catch(() => {
        alert("Updation Failure");
      });
  };

  const deleteOper = (data) => {
    StockServ.doDelete(data).catch(() => {
      alert("Deletion failure");
    });
    window.location = "/Stock";
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={moveInsert}
        data-testid="btnBlood"
        name="addbtnBlood"
        style={{ marginLeft: "130px", marginTop: "30px" }}
      >
        Add Blood
      </Button>
      <Card bg="light" id="findall" className="table table-hover">
        <Card.Header id="fheader">
          <h2>Record</h2>
        </Card.Header>
        <Card.Body>
          <Table responsive="md" data-testid="stockTable">
            <thead>
              <tr>
                <th scope="col">Blood Id</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Blood Count</th>
                <th scope="col">RBC Count</th>
                <th scope="col">WBC Count</th>
                <th scope="col">Donor Id/Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Adata.map((data) => (
                <tr>
                  <td>{data.blId}</td>
                  <td>{data.blGroup}</td>
                  <td>{data.blCount}</td>
                  <td>{data.blRBC}</td>
                  <td>{data.blWBC}</td>
                  <td>
                    <b>{data.donor.dnrId}</b>({data.donor.dnrName})
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color="warning"
                      data-testid="btnUpdate"
                      onClick={() =>
                        handleShow(
                          data.blId,
                          data.blGroup,
                          data.blCount,
                          data.blRBC,
                          data.blWBC,
                          data.donor.dnrId
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
                      name={data.bl}
                      data-testid="btnDelete"
                      onClick={() => deleteOper(data.blId)}
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
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setdnrId(e.target.value)}
            >
              <option>--change Donor--</option>
              {Bdata.map((data) => (
                <option value={data.dnrId}>{data.dnrName}</option>
              ))}
            </Form.Select>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                value={blId}
                placeholder="Blood Id"
              />
              <label htmlFor="floatingPasswordCustom">Blood Id</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                defaultValue={blGroup}
                onChange={(e) => {
                  setblGroup(e.target.value);
                }}
                placeholder="Blood Group"
              />
              <label htmlFor="floatingPasswordCustom">Blood Group</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="Blood Count"
                onChange={(e) => {
                  setblCount(e.target.value);
                }}
                defaultValue={blCount}
              />
              <label htmlFor="floatingPasswordCustom">Blood Count</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                onChange={(e) => setblRBC(e.target.value)}
                defaultValue={blRBC}
                placeholder="RBC Count"
              />
              <label htmlFor="floatingPasswordCustom">Blood RBC</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                onChange={(e) => setblWBC(e.target.value)}
                defaultValue={blWBC}
                placeholder="WBC Count"
              />
              <label htmlFor="floatingPasswordCustom">Blood WBC</label>
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

export default BloodStk;
