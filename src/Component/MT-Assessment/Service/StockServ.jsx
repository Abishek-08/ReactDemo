import axios from "axios";
import React, { Component } from "react";

const insert = "http://localhost:2024/stock/insertBlood";
const update = "http://localhost:2024/stock/updateBlood";
const dele = "http://localhost:2024/stock/deleteBlood/";
const findBlood = "http://localhost:2024/stock/findByBlood/";
const findAll = "http://localhost:2024/stock/findAllBlood";

class StockServ extends Component {
  doInsert(data) {
    return axios.post(insert, data);
  }

  doUpdate(data) {
    return axios.put(update, data);
  }

  doDelete(data) {
    return axios.delete(dele + data);
  }

  doFindBlood(data) {
    return axios.get(findBlood + data);
  }

  doFindAll() {
    return axios.get(findAll);
  }
}

export default new StockServ();
