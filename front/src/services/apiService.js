import axios from "axios";

const connection = axios.create({
  baseURL: "http://localhost:8000",
});

export const axiosPOST = async (URL, data) => {
  try {
    const res = await connection.post(URL, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
