import axios from "axios";
import { useState } from "react";

export const BASE_URL = "http://localhost:2024/donor/findAllDonor";

export const fetchData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
