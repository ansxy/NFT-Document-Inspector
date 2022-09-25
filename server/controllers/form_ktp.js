const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');

const { FormKtp } = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "assets/ktp"));
  },
  filename: (req, file, cb) => {
    const { addressWallet } = req.body;
    cb(null, `${addressWallet}.jpg`);
  }
})

const ktpImgStorage = multer({ storage });

// get all
router.get('/', async (req, res) => {
  const ktpData = await FormKtp.findAll();
  return res.json(ktpData);
});

// get data by wallet address
router.get('/:walletaddress', async (req, res) => {
  const ktpData = await FormKtp.findByPk(req.params.walletaddress);
  if (!ktpData) {
    return res.status(404).end();
  }
  return res.json(ktpData);
});

// post ktp
router.post('/', ktpImgStorage.single('image'), async (req, res) => {
  try {
    const { filename, mimetype, size } = req.file;
    const statusValidasi = 'DIPROSES';
    const newKtp = await FormKtp.create({ ...req.body, statusValidasi, namaFile: filename, tipeMime: mimetype, ukuran: size });
    return res.json(newKtp);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;