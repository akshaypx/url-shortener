import e from "express";
import getShortCode from "../../shortCode.js";
import Url from "../models/urlModel.js";
const router = e.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;
    if (url) {
      const shortCode = getShortCode(url);
      const doc = new Url();
      doc.shortCode = shortCode;
      doc.url = url;
      await doc.save().then((val) => res.status(200).json(val));
    } else {
      res.status(400).json({ message: "Url should be provided" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/shorten/:shortCode", async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/shorten/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;
    //if url does not exist in payload
    if (!url) {
      res
        .status(400)
        .json({ message: "Url to be updated is required in the payload." });
    }
    const doc = await Url.findOneAndUpdate(
      { shortCode: shortCode },
      { url: url },
      { returnOriginal: false }
    );
    if (!doc) {
      //Short code does not exists
      res.status(404).json({ message: "Short code does not exist." });
    } else {
      //Short code exists and we need to update
      res.status(201).json(doc);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
