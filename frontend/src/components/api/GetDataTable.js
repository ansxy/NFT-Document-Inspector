import axios from "axios";

export const DataTable = async (params) => {
  return await axios
    .get(`http://localhost:3001/api/formktp`)
    .then((response) => {
      const data = response.data;

      return data;
    });
};

export default DataTable;
