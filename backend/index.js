import connectToDb from "./database.js";
import getShortCode from "./shortCode.js";
import router from "./src/routes/routes.js";

import e from "express";

const PORT = process.env.PORT || 8000;

connectToDb();

const app = e();

app.use(e.json());

app.use("/", router);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
