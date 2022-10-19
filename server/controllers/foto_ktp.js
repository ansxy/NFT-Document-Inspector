const router = require("express").Router();
const { FotoKtp } = require("../models");

router.get("/", async (req, res) => {
  const ktpData = await FotoKtp.findAll();
  return res.json(ktpData);
});

router.get("/:addressWallet", async (req, res) => {
  const fotoKtp = await FotoKtp.findByPk(req.params.addressWallet);

  if (!fotoKtp) {
    return res.status(404).json({ error: 'foto tidak ditemukan!' });
  }

  return res.json(fotoKtp);
});

router.post("/", async (req, res) => {
  const { addressWallet, imgString } = req.body;
  if (!addressWallet || !imgString) {
    return res.status(400).json({ error: 'Masukkan address wallet dan string base64 dari fotonya!' });
  }
  const fotoKtp = await FotoKtp.create(addressWallet, imgString);
  return res.json(fotoKtp);
});

router.delete("/:addressWallet", async (req, res) => {
  const fotoKtp = await FotoKtp.findByPk(req.params.addressWallet);

  if (!fotoKtp) {
    return res.status(404).json({ error: 'foto tidak ditemukan!' });
  }

  await fotoKtp.destroy();
  return res.status(204).end();
});

module.exports = router;
