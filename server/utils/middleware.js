const pinataSDK = require("@pinata/sdk");
const { PINATA_API_KEY, PINATA_API_SECRET } = require("../utils/config");
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

const authenticatePinata = (req, res, next) => {
  pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
  }).catch((err) => {
    //handle error here
    console.log(err);
  });
  return next;
}

module.exports = { authenticatePinata };
