import axios from "axios";

const connection = axios.create({
  baseURL: "http://hackaton-olx-prod-hackaton-olx-m6tiu4.mo2.mogenius.io:80/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export const axiosPOST = async (URL, data) => {
  try {
    const res = await connection.post(URL, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
