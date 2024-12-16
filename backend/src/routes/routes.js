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

router.get("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  if (shortCode) {
    //api logic
    const doc = await Url.findOne({ shortCode: shortCode });
    if (!doc) {
      //if doc does not exist then return 404 error
      res.status(404).json({ message: "Url not found." });
    } else {
      //if doc exists return the doc
      res.status(200).json(doc);
    }
  } else {
    //shortCode not received in params
    //bad request
    res.status(400).json({ message: "Short Code not provided in URL." });
  }
});

export default router;
