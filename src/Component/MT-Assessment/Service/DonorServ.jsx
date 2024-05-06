import axios from "axios";
import React, { Component } from "react";

const insert = "http://localhost:2024/donor/insertDonor";
const update = "http://localhost:2024/donor/updateDonor";
const dele = "http://localhost:2024/donor/deleteDonor/";
const findId = "http://localhost:2024/donor/findByIdDonor/";
const findAll = "http://localhost:2024/donor/findAllDonor";

class DonorServ extends Component {
  doInsert(data) {
    return axios.post(insert, data);
  }

  doUpdate(data) {
    return axios.put(update, data);
  }

  doDelete(data) {
    return axios.delete(dele + data);
  }

  doFindId(data) {
    return axios.get(findId + data);
  }

  doFindAll() {
    return axios.get(findAll);
  }
}

export default new DonorServ();
