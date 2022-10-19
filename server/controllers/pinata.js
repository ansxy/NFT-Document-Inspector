// import * as IPFS from 'ipfs-core'

const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const pinataSDK = require("@pinata/sdk");
const { PINATA_API_KEY, PINATA_API_SECRET } = require("../utils/config");
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
const CryptoJS = require("crypto-js");


const { FormKtp } = require("../models");
const { authenticatePinata } = require("../utils/middleware");

/* pin to pinata

require an addressWallet (string) in request body

*/

// ini request isinya apa aja co
router.post("/", authenticatePinata, async (req, res) => {
  // let CID = "";
  // // ganti ke uri yang mau di taro di ipfs
  // // encryptedRequest = req
  // const encryptedRequest = Crypto.AES.encrypt('uri', 'address wallet')
  // const blob = new Blob([encryptedRequest], {
  //   type: "application/json;charset=uft-8",
  // });
  // const ipfs = await IPFS.create({ repo: "KTP" + Math.random() });
  // ipfs = await ipfs.add(blob).then(v => CID = v).then(ipfs.stop);

  // console.log(req);
  const { authenticated } = authenticatePinata();
  if (!authenticated) {
    return res.status(401).json({ error: 'Anda tidak mempunyai akses ke Pinata!' });
  }

  try {
    const { addressWallet } = req.body;
    const { namaFile, tipeMime, ukuran, ...ktpData } = await FormKtp.findByPk(addressWallet);

    if (!namaFile) {
      return res.status(404).json({ error: 'File foto tidak ditemukan!' });
    }

    imgPath = path.resolve(`../assets/ktp/${namaFile}`)
    const readableStreamForFile = fs.createReadStream(imgPath);
    const options = {
      pinataMetadata: {
        name: MyCustomName,
        keyvalues: { ...ktpData },
      },
      pinataOptions: {
        cidVersion: 0
      },
    }

    result = await pinata.pinFileToIPFS(readableStreamForFile, options);

    if (!result) {
      return res.status(408).json({ error: 'Upload ke Pinata gagal!' });
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// url to get a specific image => https://gateway.pinata.cloud/ipfs/your_cid

module.exports = router
