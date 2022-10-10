import axios from "axios";

const connection = axios.create({
  baseURL:
    "http://www.hackaton-olx-prod-hackaton-olx-m6tiu4.mo2.mogenius.io:8000",
  headers: "content-type': 'application/json",
});

export const axiosPOST = async (URL, data) => {
  try {
    const res = await connection.post(URL, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
