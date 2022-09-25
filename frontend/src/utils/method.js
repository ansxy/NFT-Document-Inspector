const axios = require('axios');

// TODO: insert this url below to .env file
const baseUrl = 'http://localhost:3001';

const getImgBytecode = async (filename, mimetype, doc) => {
  try {
    let img;
    doc === 'ktp' ?
      img = await axios.get(`${baseUrl}/ktp/${filename}`, { responseType: 'arraybuffer' })
      : img = await axios.get(`${baseUrl}/sertifikattanah/${filename}`, { responseType: 'arraybuffer' });

    return `data:${mimetype};base64,` + Buffer.from(img.data).toString('base64');

  } catch (err) {
    console.log(err);
  }
}

const setNftUri = async (addressWallet, doc) => {
  try {
    let res;

    doc === 'ktp' ?
      res = await axios.get(`${baseUrl}/api/formktp/${addressWallet}`)
      : res = await axios.get(`${baseUrl}/api/formsertifikattanah/${addressWallet}`);

    const { statusValidasi, namaFile, tipeMime, ukuran, createdAt, updatedAt, ...data } = res.data;
    if (statusValidasi !== 'DITERIMA') {
      return 'Tidak bisa membuat NFT KTP';
    }
    const foto = await getImgBytecode(namaFile, tipeMime, doc);
    const tanggalDibuat = (new Date()).toDateString();

    const metadata = { ...data, foto, tanggalDibuat };
    return 'data:application/json;base64,' + Buffer.from(JSON.stringify(metadata)).toString('base64');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getImgBytecode, setNftUri };
