const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

const { FormKtp } = require("../models");

// TODO : it need wait till all data is correct then put image in assets
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../assets/ktp");
  },
  filename: (req, file, cb) => {
    const { addressWallet } = req.body;
    cb(null, `${addressWallet}.jpg`);
  },
});

// get all
router.get("/", async (req, res) => {
  const ktpData = await FormKtp.findAll();
  return res.json(ktpData);
});

// get data by wallet address
router.get("/:walletaddress", async (req, res) => {
  const ktpData = await FormKtp.findByPk(req.params.walletaddress);
  if (!ktpData) {
    return res.status(404).end();
  }
  return res.json(ktpData);
});

const ktpImgStorage = multer({ storage });
// post ktp
router.post("/", ktpImgStorage.single("file"), async (req, res) => {
  try {
    const { filename, mimetype, size } = req.file;
    const statusValidasi = "DIPROSES";
    const newKtp = await FormKtp.create({
      ...req.body,
      statusValidasi,
      namaFile: filename,
      tipeMime: mimetype,
      ukuran: size,
    });
    return res.json(newKtp);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:addressWallet", async (req, res) => {
  const ktpData = await FormKtp.findByPk(req.params.addressWallet);
  if (!ktpData) {
    return res.status(404).end();
  }
  await req.ktpData.destroy();
  return res.status(204).end();
});

router.put("/:addressWallet", async (req, res) => {
  const ktpData = await FormKtp.findByPk(req.params.addressWallet);
  if (!ktpData) {
    return res.status(404).end();
  }
  const keys = Object.keys(body);

  keys.forEach(async (key, index) => {
    ktpData[key] = req.body[key];
    await ktpData.save();
  });

  return res.json(ktpData);
});

module.exports = router;
