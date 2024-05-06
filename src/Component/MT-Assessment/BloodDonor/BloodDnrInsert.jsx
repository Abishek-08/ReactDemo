import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import DonorServ from "../Service/DonorServ";

const BloodDnrInsert = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const goBack = () => {
    navigate("/Donor");
  };

  const getFormData = (data) => {
    DonorServ.doInsert(data)
      .then(() => {
        navigate("/Donor");
      })
      .catch(() => {
        alert("Not Inserted");
      });
  };

  return (
    <div>
      <Card bg="dark" border="dark" id="Mform" data-testid="card">
        <Card.Header id="header">
          <h2 data-testid="InsertHeading">Insertion Operation</h2>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(getFormData)}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="Donor Name"
                {...register("dnrName", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Donor Name</label>
              {errors.dnrName && <p className="error">Please fill the Field</p>}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                name="Donor Age"
                placeholder="Donor Age"
                {...register("dnrAge", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Donor Age</label>
              {errors.dnrAge && <p className="error">Please fill the Field</p>}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                name="Weight"
                placeholder="Weight"
                {...register("dnrWeight", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Donor Weight</label>
              {errors.dnrWeight && (
                <p className="error">Please fill the Field</p>
              )}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                name="Mobile"
                placeholder="Mobile"
                {...register("dnrMob", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Mobile</label>
              {errors.dnrMob && <p className="error">Please fill the Field</p>}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                name="Location"
                placeholder="Location"
                {...register("dnrLocation", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Location</label>
              {errors.dnrLocation && (
                <p className="error">Please fill the Field</p>
              )}
            </Form.Floating>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={goBack}
              id="btnDnrBack"
              className="btn btn-primary"
            >
              GoBack
            </Button>
            <button
              type="submit"
              value="Insert"
              //name="btnInsert"
              id="btnInsert"
              className="btn btn-success"
              style={{ marginLeft: "300px" }}
            >
              Insert
            </button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BloodDnrInsert;
