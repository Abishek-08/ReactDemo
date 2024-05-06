import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import StockServ from "../Service/StockServ";
import DonorServ from "../Service/DonorServ";

const BloodStkInsert = () => {
  const navigate = useNavigate();
  const [BData, setBData] = useState([]);
  const [dnrId, setdnrId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    DonorServ.doFindAll().then((response) => {
      setBData(response.data);
    });
  }, []);

  const goBack = () => {
    navigate("/Stock");
  };

  const getFormData = (data) => {
    var { blGroup, blCount, blRBC, blWBC } = data;
    var inData = {
      blGroup,
      blCount,
      blRBC,
      blWBC,
      donor: { dnrId },
    };
    console.log(inData);
    StockServ.doInsert(inData)
      .then(() => {
        navigate("/Stock");
      })
      .catch(() => {
        alert("Not Inserted");
      });
  };
  return (
    <div>
      <Card bg="dark" border="dark" id="Mform">
        <Card.Header id="header">
          <h2>Insertion Operation</h2>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(getFormData)}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="dnrName"
              onChange={(e) => setdnrId(e.target.value)}
            >
              <option>--select Donor--</option>
              {BData.map((data) => (
                <option value={data.dnrId}>{data.dnrName}</option>
              ))}
            </Form.Select>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="Blood Group"
                {...register("blGroup", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Blood Group</label>
              {errors.blGroup && <p className="error">Please fill the Field</p>}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="Blood Count"
                {...register("blCount", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">Blood Count</label>
              {errors.blCount && <p className="error">Please fill the Field</p>}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="RBC Count"
                {...register("blRBC", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">RBC Count</label>
              {errors.blRBC && <p className="error">Please fill the Field</p>}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="WBC Count"
                {...register("blWBC", { required: true })}
              />
              <label htmlFor="floatingPasswordCustom">WBC Count</label>
              {errors.blWBC && <p className="error">Please fill the Field</p>}
            </Form.Floating>

            <br />
            <Button variant="contained" color="primary" onClick={goBack}>
              GoBack
            </Button>
            <Button
              variant="contained"
              color="success"
              //data-testid="btnInsert"
              type="submit"
              name="btnInsert"
              style={{ marginLeft: "300px" }}
            >
              Insert
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BloodStkInsert;
