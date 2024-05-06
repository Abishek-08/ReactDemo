import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import StockServ from "../Service/StockServ";
import DonorServ from "../Service/DonorServ";

const Cust = () => {
  const [BData, setBData] = useState([]);
  const [Fdata, setFdata] = useState([]);
  const [Ddata, setDdata] = useState([]);
  const [blGroup, setblGroup] = useState("");
  const [Tbl, setTbl] = useState(false);
  const [TblD, setTblD] = useState(false);
  useEffect(() => {
    StockServ.doFindAll().then((response) => {
      setBData(response.data);
    });
  }, []);

  const findBlood = () => {
    setTbl(true);
    StockServ.doFindBlood(blGroup).then((response) => {
      setFdata(response.data);
    });
  };

  const fDonor = (data) => {
    setTblD(true);
    DonorServ.doFindId(data).then((response) => {
      setDdata(response.data);
    });
  };
  return (
    <div>
      <Card bg="dark" border="dark" id="Mform">
        <Card.Header id="header">
          <h2>Search Operation</h2>
        </Card.Header>
        <Card.Body data-testid="bldTable">
          <label style={{ color: "white" }}>
            Select Blood Group you want??
          </label>
          <br />
          <Form.Select
            aria-label="Default select example"
            data-testid="bldgrpBox"
            name="bldDrp"
            onChange={(e) => {
              setblGroup(e.target.value);
            }}
          >
            <option>--select--</option>
            {BData.map((data) => (
              <option value={data.blGroup}>{data.blGroup}</option>
            ))}
          </Form.Select>
          <br />
          <Button
            variant="contained"
            color="primary"
            //data-testid="btnSearch"
            name="btnSearch"
            onClick={findBlood}
          >
            search
          </Button>
        </Card.Body>
      </Card>
      <br />
      {Tbl && (
        <Card bg="light" className="tbl">
          <Card.Header id="header">
            <h2>Blood Information</h2>
          </Card.Header>
          <Card.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Id</th>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Blood Count</th>
                  <th scope="col">RBC Count</th>
                  <th scope="col">WBC Count</th>
                  <th scope="col">Donor Id/Name</th>
                </tr>
              </thead>
              <tbody>
                {Fdata.map((data) => (
                  <tr>
                    <td>{data.blId}</td>
                    <td>{data.blGroup}</td>
                    <td>{data.blCount}</td>
                    <td>{data.blRBC}</td>
                    <td>{data.blWBC}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        name="btnDnr"
                        onClick={() => fDonor(data.donor.dnrId)}
                      >
                        <b>{data.donor.dnrId}</b>({data.donor.dnrName})
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      )}

      {TblD && (
        <Card
          bg="light"
          id="findall"
          class="table table-hover"
          style={{ marginBottom: "100px" }}
        >
          <Card.Header id="fheader">
            <h2>Donor Information for the Blood</h2>
          </Card.Header>
          <Card.Body>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Donor ID</th>
                  <th scope="col">Donor Name</th>
                  <th scope="col">Donor Age</th>
                  <th scope="col">Donor Weight</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Ddata.dnrId}</td>
                  <td>{Ddata.dnrName}</td>
                  <td>{Ddata.dnrAge}</td>
                  <td>{Ddata.dnrWeight}</td>
                  <td>{Ddata.dnrMob}</td>
                  <td>{Ddata.dnrLocation}</td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Cust;
