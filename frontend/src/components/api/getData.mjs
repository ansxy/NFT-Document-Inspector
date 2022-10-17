import axios from "axios";

export const getProvinsi = async (params) => {
  return await axios
    .get(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
    .then((response) => {
      const data = response.data;
      return data;
    });
};

// export const getKecematan = async (params) => {
//   await axios
//     .get(
//       `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${params}.json`
//     )
//     .then((response) => {
//       const data = response.data;
//       console.log(data);
//     });
// };

// export const getKelurahan = async (params) => {
//   await axios
//     .get(
//       `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${params}.json`
//     )
//     .then((response) => {
//       const data = response.data;
//       return data;
//     });
// };
