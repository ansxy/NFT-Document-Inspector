const axios = require("axios");
window.Buffer = window.Buffer || require("buffer").Buffer;

export const getImgBytecode = async (filename, mimetype, doc) => {
  try {
    let img;
    doc === "ktp"
      ? (img = await axios.get(
          `${process.env.REACT_APP_BASE_URL}ktp/${filename}`,
          {
            responseType: "arraybuffer",
          }
        ))
      : (img = await axios.get(
          `${process.env.REACT_APP_BASE_URL}sertifikattanah/${filename}`,
          {
            responseType: "arraybuffer",
          }
        ));

    return (
      `data:${mimetype};base64,` + Buffer.from(img.data).toString("base64")
    );
  } catch (err) {
    console.log(err);
  }
};

export const setNftUri = async (addressWallet, doc) => {
  try {
    let res;
    doc === "ktp"
      ? (res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/formktp/${addressWallet}`
        ))
      : (res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/formsertifikattanah/${addressWallet}`
        ));

    const {
      statusValidasi,
      namaFile,
      tipeMime,
      ukuran,
      createdAt,
      updatedAt,
      ...data
    } = res.data;
    if (statusValidasi === "DITERIMA") {
      return "Tidak bisa membuat NFT KTP";
    }
    const tanggalDibuat = new Date().toDateString();
    const metadata = { ...data, tanggalDibuat };
    return (
      "data:application/json;base64," +
      Buffer.from(JSON.stringify(metadata)).toString("base64")
    );
  } catch (err) {
    console.log(err);
  }
};

export default (getImgBytecode, setNftUri);
