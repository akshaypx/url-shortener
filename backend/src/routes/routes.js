import e from "express";
import getShortCode from "../../shortCode.js";
import Url from "../models/urlModel.js";
const router = e.Router();

router.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (url) {
    const shortCode = getShortCode(url);
    const doc = new Url();
    doc.shortCode = shortCode;
    doc.url = url;
    try {
      await doc.save().then((val) => res.status(200).json(val));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.status(400).json({ message: "Url should be provided" });
  }
});

export default router;
